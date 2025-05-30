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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import styles from "../styles/ConfirmRequestStyles";
import AppBarSimple from "../../../components/appbar/SimpleAppBar";
import HireCosplayerService from "../../../apiServices/hireCosplayerService/hireCosplayerService";
import { AuthContext } from "../../../../assets/context/AuthContext";
import { HireFlowContext } from "../../../../assets/context/HireFlowContext";
import { Picker } from "@react-native-picker/picker";
import LocationPickerService from "../../../apiServices/LocationService/LocationPickerService";

const ConfirmRequest = ({ navigation }) => {
  const { formData, timeData, selectedPairs, setSelectedPairs, resetHireFlow } =
    useContext(HireFlowContext);
  const { user } = useContext(AuthContext);

  const [note, setNote] = useState("");
  const [deposit, setDeposit] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(30);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [address, setAddress] = useState(""); // số nhà, tên đường
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await LocationPickerService.getAllProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to load provinces", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const data = await LocationPickerService.getAllDistricts(selectedProvince.id);
        setDistricts(data);
        setSelectedDistrict(null);
        setWards([]);
        setSelectedWard(null);
      } catch (error) {
        console.error("Failed to load districts", error);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard(null);
      return;
    }
    const fetchWards = async () => {
      try {
        const data = await LocationPickerService.getStreets(selectedDistrict.id);
        setWards(data);
        setSelectedWard(null);
      } catch (error) {
        console.error("Failed to load wards", error);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const totalHours = useMemo(() => {
    let total = 0;
    for (const time of Object.values(timeData)) {
      const [startH, startM] = time.start.split(":").map(Number);
      const [endH, endM] = time.end.split(":").map(Number);
      total += endH + endM / 60 - (startH + startM / 60);
    }
    return total;
  }, [timeData]);

  const totalDays = useMemo(() => Object.keys(timeData).length, [timeData]);

  const totalSalary = useMemo(() => {
    let total = 0;
    selectedPairs.forEach((pair) => {
      pair.cosplayers.forEach((cos) => {
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

  const formatMoney = (num) =>
    Number(num)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleRemoveCosplayer = (charIdx, cosIdx) => {
    Alert.alert("Confirm", "Are you sure you want to remove this cosplayer?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          const updatedPairs = [...selectedPairs];
          updatedPairs[charIdx].cosplayers.splice(cosIdx, 1);
          setSelectedPairs(updatedPairs);
        },
      },
    ]);
  };

  const handleSubmit = async () => {
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !address.trim() ||
      !deposit ||
      isNaN(deposit) ||
      Number(deposit) < initialDeposit
    ) {
      Alert.alert(
        "Invalid input",
        `Please select full address (Province, District, Ward) and enter house address. Deposit no less than ${initialDeposit}`
      );
      return;
    }

      


    const fullAddress = `${address.trim()}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;

    const charactersRentCosplayers = selectedPairs.flatMap((pair) =>
      pair.cosplayers.map((cos) => ({
        characterId: pair.character.characterId,
        cosplayerId: cos.accountId,
        description: "No description",
        listRequestDates: Object.entries(timeData).map(([date, time]) => ({
          startDate: `${time.start} ${moment(date, "DD-MM-YYYY").format("DD/MM/YYYY")}`,
          endDate: `${time.end} ${moment(date, "DD-MM-YYYY").format("DD/MM/YYYY")}`,
        })),
      }))
    );
    
    
    const payload = {
      accountId: user?.id,
      name: user?.accountName || "Rental Request",
      description: note || "No description",
      price: totalSalary,
      startDate: moment(formData.startDate, "DD-MM-YYYY").format("DD/MM/YYYY"),
      endDate: moment(formData.endDate, "DD-MM-YYYY").format("DD/MM/YYYY"),
      location: fullAddress,
      accountCouponId: null,
      deposit: selectedPackage.toString(),
      charactersRentCosplayers,
    };

    try {
      setIsLoading(true); 
      await HireCosplayerService.NewSendRequestHireCosplayer(payload);
      await resetHireFlow();
      Alert.alert("Success", "Your request has been submitted and is pending approval.");
      navigation.reset({ index: 0, routes: [{ name: "MainDrawer" }] });
    } catch (err) {
      console.error("Submission error:", err);
      Alert.alert("Server error", err.message || "Unknown error");
    }finally{
       setIsLoading(false); 
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
          <Text key={date} style={styles.timeEntry}>
            • {date}: {time.start} - {time.end}
          </Text>
        ))}

        {selectedPairs.map((pair, idx) => (
          <View key={idx} style={styles.confirmBlock}>
            <Text style={styles.characterName}>🎭 {pair.character.characterName}</Text>
            <Text style={styles.timeEntry}>
              💰 {formatMoney(pair.character.price)}đ/day × {totalDays} days
            </Text>
            {pair.cosplayers.map((cos, cosIdx) => {
              const cosCost = cos.salaryIndex * totalHours + pair.character.price * totalDays;
              return (
                <View key={cos.accountId} style={styles.cosplayerCard}>
                  <View style={styles.cosplayerInfo}>
                    {cos.image && <Image source={{ uri: cos.image }} style={styles.cosplayerImage} />}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cosplayerName}>{cos.name}</Text>
                      <Text style={styles.cosplayerDetail}>
                        ⭐ {cos.averageStar} | 💰 {formatMoney(cos.salaryIndex)}đ/h × {totalHours}h
                      </Text>
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
          {[30, 50, 70].map((percent) => (
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

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Province</Text>
          <Picker
            selectedValue={selectedProvince?.id}
            onValueChange={(value) => {
              const prov = provinces.find((p) => p.id === value);
              setSelectedProvince(prov);
            }}
          >
            <Picker.Item label="Select Province" value={null} />
            {provinces.map((prov) => (
              <Picker.Item key={prov.id} label={prov.name} value={prov.id} />
            ))}
          </Picker>
        </View>

        {selectedProvince && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Select District</Text>
            <Picker
              selectedValue={selectedDistrict?.id}
              onValueChange={(value) => {
                const dist = districts.find((d) => d.id === value);
                setSelectedDistrict(dist);
              }}
            >
              <Picker.Item label="Select District" value={null} />
              {districts.map((dist) => (
                <Picker.Item key={dist.id} label={dist.name} value={dist.id} />
              ))}
            </Picker>
          </View>
        )}

        {selectedDistrict && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Select Ward</Text>
            <Picker
              selectedValue={selectedWard?.id}
              onValueChange={(value) => {
                const ward = wards.find((w) => w.id === value);
                setSelectedWard(ward);
              }}
            >
              <Picker.Item label="Select Ward" value={null} />
              {wards.map((ward) => (
                <Picker.Item key={ward.id} label={ward.name} value={ward.id} />
              ))}
            </Picker>
          </View>
        )}

        {selectedWard && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Street</Text>
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            value={note}
            onChangeText={setNote}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deposit</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={deposit}
            onChangeText={setDeposit}
          />
          <Text style={styles.hintText}>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradientButton}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Confirm Request</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmRequest;
