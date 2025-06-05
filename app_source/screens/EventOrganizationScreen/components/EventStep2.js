import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../css/Step2Style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LocationPickerService from "../../../apiServices/LocationService/LocationPickerService";

const EventStep2 = ({ goNextStep, goBackStep }) => {
  const [location, setLocation] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const [datePickerMode, setDatePickerMode] = useState(null); // "startDate", "endDate"
  const [timePickerMode, setTimePickerMode] = useState(null); // "startTime", "endTime"
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const today = new Date();
  const minStartDate = new Date(today);
  minStartDate.setDate(today.getDate() + 4);
  minStartDate.setHours(0, 0, 0, 0);

  const handleDateConfirm = (date) => {
    const formatted = date.toISOString().split("T")[0];

    if (datePickerMode === "startDate") {
      if (date < minStartDate) {
        Alert.alert(
          "Invalid Date",
          "Start date must be at least 4 days from today."
        );
      } else {
        setStartDate(formatted);
      }
    }

    if (datePickerMode === "endDate") {
      if (!startDate) {
        Alert.alert("Missing Info", "Please select start date first.");
      } else {
        const maxEnd = new Date(startDate);
        maxEnd.setDate(maxEnd.getDate() + 10);
        if (date < new Date(startDate)) {
          Alert.alert("Invalid Date", "End date must be after start date.");
        } else if (date > maxEnd) {
          Alert.alert(
            "Invalid Date",
            "End date must be within 10 days of start date."
          );
        } else {
          setEndDate(formatted);
        }
      }
    }

    setShowDatePicker(false);
    setDatePickerMode(null);
  };

  const handleTimeConfirm = (time) => {
    const hour = time.getHours();
    const formatted = time.toTimeString().slice(0, 5);

    if (hour < 8 || hour >= 22) {
      Alert.alert(
        "Invalid Time",
        "Please choose a time between 08:00 and 22:00."
      );
    } else {
      if (timePickerMode === "startTime") {
        setStartTime(formatted);
      }

      if (timePickerMode === "endTime") {
        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate || startDate}T${formatted}`);

        if (
          start.toDateString() === end.toDateString() &&
          end.getTime() - start.getTime() < 60 * 60 * 1000
        ) {
          Alert.alert(
            "Invalid Duration",
            "End time must be at least 1 hour after start time."
          );
        } else if (end <= start) {
          Alert.alert("Invalid Time", "End time must be after start time.");
        } else {
          setEndTime(formatted);
        }
      }
    }

    setShowTimePicker(false);
    setTimePickerMode(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Event Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, styles.halfInput]}
          onPress={() => {
            setDatePickerMode("startDate");
            setShowDatePicker(true);
          }}
        >
          <Text>{startDate || "Select Start Date"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, styles.halfInput]}
          onPress={() => {
            setDatePickerMode("endDate");
            setShowDatePicker(true);
          }}
        >
          <Text>{endDate || "Select End Date"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, styles.halfInput]}
          onPress={() => {
            setTimePickerMode("startTime");
            setShowTimePicker(true);
          }}
        >
          <Text>{startTime || "Select Start Time"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, styles.halfInput]}
          onPress={() => {
            setTimePickerMode("endTime");
            setShowTimePicker(true);
          }}
        >
          <Text>{endTime || "Select End Time"}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Event Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={goBackStep}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (
              !location ||
              !startDate ||
              !startTime ||
              !endDate ||
              !endTime ||
              !description
            ) {
              Alert.alert("Missing Information", "Please fill in all fields.");
              return;
            }

            goNextStep({
              location,
              startDate,
              startTime,
              endDate,
              endTime,
              description,
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={
          datePickerMode === "startDate"
            ? minStartDate
            : startDate
            ? new Date(startDate)
            : minStartDate
        }
        maximumDate={
          datePickerMode === "endDate" && startDate
            ? new Date(
                new Date(startDate).setDate(new Date(startDate).getDate() + 10)
              )
            : undefined
        }
      />

      {/* Time Picker */}
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(false)}
      />
    </ScrollView>
  );
};

export default EventStep2;
