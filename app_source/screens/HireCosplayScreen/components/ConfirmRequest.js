import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import styles from "../styles/ConfirmRequestStyles";
import AppBarSimple from "../../../components/appbar/SimpleAppBar";
import provinces from "../../../helpers/vietnamProvinces";
import HireCosplayerService from "../../../apiServices/hireCosplayerService/hireCosplayerService";
import { AuthContext } from "../../../../assets/context/AuthContext";
import { HireFlowContext } from "../../../../assets/context/HireFlowContext";


const ConfirmRequest = ({ navigation }) => {
  const { formData, timeData, selectedPairs, setSelectedPairs,resetHireFlow } = useContext(HireFlowContext);
  const { user } = useContext(AuthContext);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [deposit, setDeposit] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(30);
  const [showDropdown, setShowDropdown] = useState(false);

  const totalHours = useMemo(() => {
    let total = 0;
    for (const time of Object.values(timeData)) {
      const [startH, startM] = time.start.split(":").map(Number);
      const [endH, endM] = time.end.split(":").map(Number);
      total += (endH + endM / 60) - (startH + startM / 60);
    }
    return total;
  }, [timeData]);

  const totalDays = useMemo(() => Object.keys(timeData).length, [timeData]);

  const totalSalary = useMemo(() => {
    let total = 0;
    selectedPairs.forEach(pair => {
      pair.cosplayers.forEach(cos => {
        total += cos.salaryIndex * totalHours + pair.character.price * totalDays;
      });
    });
    return total;
  }, [selectedPairs, totalHours, totalDays]);
  

  useEffect(() => {
    const initDeposit = Math.round((totalSalary * selectedPackage) / 100);
    setDeposit(initDeposit.toString());
    setInitialDeposit(initDeposit);
  }, [totalSalary, selectedPackage]);

  const formatMoney = (num) => Number(num).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const suggestedLocations = useMemo(() =>
    provinces.filter(prov => prov.toLowerCase().includes(location.toLowerCase())), [location]);

  const handleSelectLocation = (prov) => {
    setLocation(prov);
    setShowDropdown(false);
  };

  const handleRemoveCosplayer = (charIdx, cosIdx) => {
    Alert.alert("Confirm", "Are you sure you want to remove this cosplayer?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => {
          const updatedPairs = [...selectedPairs];
          updatedPairs[charIdx].cosplayers.splice(cosIdx, 1);
          setSelectedPairs(updatedPairs);
        }
      }
    ]);
  };

  const handleSubmit = async () => {
    if (!location || !deposit || isNaN(deposit) || Number(deposit) < initialDeposit) {
      alert(`Please enter a valid location and a deposit no less than ${initialDeposit}`);
      return;
    }
  
    const charactersRentCosplayers = selectedPairs.flatMap(pair =>
      pair.cosplayers.map(cos => ({
        characterId: pair.character.characterId,
        cosplayerId: cos.accountId,
        description: "No description",
        listRequestDates: Object.entries(timeData).map(([date, time]) => ({
          startDate: `${time.start} ${moment(date, "DD-MM-YYYY").format("DD/MM/YYYY")}`,
          endDate: `${time.end} ${moment(date, "DD-MM-YYYY").format("DD/MM/YYYY")}`,
        }))
      }))
    );
  
    const payload = {
      accountId: user?.id,
      name: user?.accountName || "Rental Request",
      description: note || "No description",
      price: totalSalary,
      startDate: moment(formData.startDate, "DD-MM-YYYY").format("DD/MM/YYYY"),
      endDate: moment(formData.endDate, "DD-MM-YYYY").format("DD/MM/YYYY"),
      location,
      accountCouponId: null,
      deposit: selectedPackage.toString(),
      charactersRentCosplayers,
    };
  
    try {
      await HireCosplayerService.NewSendRequestHireCosplayer(payload);
      await resetHireFlow(); 
      alert("Your request has been submitted and is pending approval.");
      navigation.reset({ index: 0, routes: [{ name: "MainDrawer" }] });
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error: " + (err.message || "Unknown error"));
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBarSimple title="Confirm Request" />
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>Request Summary</Text>
        <Text style={styles.label}>Start Date: {formData.startDate}</Text>
        <Text style={styles.label}>End Date: {formData.endDate}</Text>

        <Text style={styles.label}>Time Slots:</Text>
        {Object.entries(timeData).map(([date, time]) => (
          <Text key={date} style={styles.timeEntry}>• {date}: {time.start} - {time.end}</Text>
        ))}

        {selectedPairs.map((pair, idx) => (
          <View key={idx} style={styles.confirmBlock}>
            <Text style={styles.characterName}>🎭 {pair.character.characterName}</Text>
            <Text style={styles.timeEntry}>💰 {formatMoney(pair.character.price)}đ/day × {totalDays} days</Text>
            {pair.cosplayers.map((cos, cosIdx) => {
              const cosCost = (cos.salaryIndex * totalHours) + (pair.character.price * totalDays);
              return (
                <View key={cos.accountId} style={styles.cosplayerCard}>
                  <View style={styles.cosplayerInfo}>
                    {cos.image && <Image source={{ uri: cos.image }} style={styles.cosplayerImage} />}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cosplayerName}>{cos.name}</Text>
                      <Text style={styles.cosplayerDetail}>⭐ {cos.averageStar} | 💰 {formatMoney(cos.salaryIndex)}đ/h × {totalHours}h</Text>
                      <Text style={styles.cosplayerDetail}>➔ Total: {formatMoney(cosCost)}đ</Text>
                      <TouchableOpacity onPress={() => handleRemoveCosplayer(idx, cosIdx)}>
                        <Text style={styles.removeText}>❌ Remove Cosplayer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))}

        <Text style={styles.totalLabel}>Total: {formatMoney(totalSalary)}đ</Text>

        <Text style={styles.label}>Select Deposit Package:</Text>
        <View style={styles.depositOptions}>
          {[30, 50, 70].map(percent => (
            <TouchableOpacity
              key={percent}
              onPress={() => setSelectedPackage(percent)}
              style={[styles.depositOption, selectedPackage === percent && styles.depositOptionActive]}
            >
              <Text style={[styles.depositText, selectedPackage === percent && styles.depositTextActive]}>
                {percent}% ({formatMoney(Math.round((totalSalary * percent) / 100))}đ)
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter location"
            style={styles.input}
            value={location}
            onChangeText={text => { setLocation(text); setShowDropdown(true); }}
          />
          {showDropdown && (
            <ScrollView style={styles.dropdown}>
              {suggestedLocations.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSelectLocation(item)}
                  style={styles.dropdownItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Deposit (VND)"
            style={styles.input}
            keyboardType="numeric"
            value={deposit}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Additional Notes (optional)"
            style={[styles.input, styles.textArea]}
            multiline
            value={note}
            onChangeText={setNote}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient colors={["#510545", "#22668a"]} style={styles.gradientButton}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmRequest;
