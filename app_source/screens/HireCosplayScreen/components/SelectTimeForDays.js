import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import styles from "../styles/HireCosplayStyles";
import AppBarSimple from "../../../components/appbar/SimpleAppBar";
import { HireFlowContext } from "../../../../assets/context/HireFlowContext";

const SelectTimeForDays = ({ navigation }) => {
  const { formData, timeData, setTimeData } = useContext(HireFlowContext);
  const [activePicker, setActivePicker] = useState({ date: "", type: "" });

  const { startDate, endDate } = formData;

  const start = moment(startDate, "DD-MM-YYYY", true);
  const end = moment(endDate, "DD-MM-YYYY", true);

  const dateRange = [];
  const current = start.clone();
  while (current.isSameOrBefore(end)) {
    dateRange.push(current.format("DD-MM-YYYY"));
    current.add(1, "days");
  }

  const showPicker = (date, type) => {
    if (!timeData[date]) {
      setTimeData(prev => ({
        ...prev,
        [date]: { start: "08:00", end: "22:00" },
      }));
    }
    setActivePicker({ date, type });
  };

  const onTimeChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setActivePicker({ date: "", type: "" });
      return;
    }

    const selectedMoment = moment(selectedTime);
    const hour = selectedMoment.hour();
    if (hour < 8 || hour > 22) {
      Alert.alert("Invalid Time", "Time must be between 08:00 and 22:00.");
      return;
    }

    const formatted = selectedMoment.format("HH:mm");
    handleTimeChange(activePicker.date, activePicker.type, formatted);
    setActivePicker({ date: "", type: "" });
  };

  const handleTimeChange = (dateKey, timeType, value) => {
    setTimeData(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [timeType]: value,
      },
    }));
  };

  const isValid = () => {
    return dateRange.every(date => {
      const t = timeData[date];
      return (
        t &&
        t.start &&
        t.end &&
        moment(t.end, "HH:mm", true).isAfter(moment(t.start, "HH:mm", true))
      );
    });
  };

  const handleNext = () => {
    if (!isValid()) {
      Alert.alert("Invalid Time", "Please enter valid time ranges for all dates.");
      return;
    }
    navigation.navigate("SelectCharacter");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBarSimple title="Select Time For Each Day" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ width: "100%", maxWidth: 400 }}>
          {dateRange.map(date => (
            <View key={date} style={styles.inputContainer}>
              <Text style={styles.label}>{date}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => showPicker(date, "start")}>
                  <TextInput
                    placeholder="Start (HH:mm)"
                    style={styles.input}
                    editable={false}
                    value={timeData[date]?.start || ""}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => showPicker(date, "end")}>
                  <TextInput
                    placeholder="End (HH:mm)"
                    style={styles.input}
                    editable={false}
                    value={timeData[date]?.end || ""}
                  />
                </TouchableOpacity>
              </View>

              {activePicker.date === date && (
                <DateTimePicker
                  value={moment(timeData[date]?.[activePicker.type] || "08:00", "HH:mm").toDate()}
                  mode="time"
                  display="spinner"
                  is24Hour={true}
                  onChange={onTimeChange}
                />
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <LinearGradient colors={["#510545", "#22668a"]} style={styles.gradientButton}>
              <Text style={styles.submitButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectTimeForDays;

