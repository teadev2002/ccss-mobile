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
import { Picker } from "@react-native-picker/picker";

const EventStep2 = ({ goNextStep, goBackStep }) => {
  const [location, setLocation] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [address, setAddress] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
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

  // Fetch districts for HCM (ID: 202)
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const districtData = await LocationPickerService.getDistricts();
        setDistricts(districtData);
      } catch (error) {
        console.error("Error fetching districts:", error.message);
        Alert.alert("Error", "Failed to load districts. Please try again.");
      }
    };
    fetchDistricts();
  }, []);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const wardData = await LocationPickerService.getStreets(
            selectedDistrict.id
          );
          setWards(wardData);
          setSelectedWard(null); // Reset ward when district changes
        } catch (error) {
          console.error("Error fetching wards:", error.message);
          Alert.alert("Error", "Failed to load wards. Please try again.");
        }
      };
      fetchWards();
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  // Update location string when address, ward, or district changes
  useEffect(() => {
    if (address && selectedWard && selectedDistrict) {
      setLocation(
        `${address}, ${selectedWard.name}, ${selectedDistrict.name}, Thành phố Hồ Chí Minh`
      );
    } else {
      setLocation("");
    }
  }, [address, selectedWard, selectedDistrict]);

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

      {/* Location Picker */}
      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.fixedProvince}>Thành phố Hồ Chí Minh</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDistrict?.id || ""}
            onValueChange={(value) => {
              const district = districts.find((d) => d.id === value);
              setSelectedDistrict(district || null);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select District" value="" />
            {districts.map((district) => (
              <Picker.Item
                key={district.id}
                label={district.name}
                value={district.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedWard?.id || ""}
            onValueChange={(value) => {
              const ward = wards.find((w) => w.id === value);
              setSelectedWard(ward || null);
            }}
            style={styles.picker}
            enabled={wards.length > 0}
          >
            <Picker.Item label="Select Ward" value="" />
            {wards.map((ward) => (
              <Picker.Item key={ward.id} label={ward.name} value={ward.id} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter detailed address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Date and Time Pickers */}
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

      {/* Description */}
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Event Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={goBackStep}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (
              !address ||
              !selectedDistrict ||
              !selectedWard ||
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
