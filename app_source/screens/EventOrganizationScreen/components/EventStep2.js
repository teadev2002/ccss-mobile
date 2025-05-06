import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../css/Step2Style";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EventStep2 = ({ goNextStep, goBackStep }) => {
  const [eventName, setEventName] = useState("");
  const [eventTheme, setEventTheme] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [images, setImages] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPickerMode, setCurrentPickerMode] = useState("start"); // 'start' | 'end'

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
  }, []);

  const showDatePicker = (mode) => {
    setCurrentPickerMode(mode);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toTimeString().split(" ")[0].slice(0, 5);
    if (currentPickerMode === "start") {
      setStartDate(formattedDate);
      setStartTime(formattedTime);
    } else {
      setEndDate(formattedDate);
      setEndTime(formattedTime);
    }
    hideDatePicker();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Event Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Event Theme (e.g., Anime, Spider-Man...)"
        value={eventTheme}
        onChangeText={setEventTheme}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, styles.halfInput]}
          onPress={() => showDatePicker("start")}
        >
          <Text>{startDate ? `${startDate} ${startTime}` : "Start Date & Time"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, styles.halfInput]}
          onPress={() => showDatePicker("end")}
        >
          <Text>{endDate ? `${endDate} ${endTime}` : "End Date & Time"}</Text>
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

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Venue Description"
        multiline
        numberOfLines={4}
        value={venueDescription}
        onChangeText={setVenueDescription}
      />

      <Button title="Upload Image" onPress={pickImage} />

      <ScrollView horizontal style={styles.imagePreview}>
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img.uri }}
            style={styles.uploadedImage}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={goBackStep}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            // if (!eventName || !eventTheme || !location || !startDate || !startTime || !endDate || !endTime || !description || !venueDescription) {
            //   alert("Please fill in all required fields before continuing.");
            //   return;
            // }

            goNextStep({
              eventName,
              eventTheme,
              location,
              startDate,
              startTime,
              endDate,
              endTime,
              description,
              venueDescription,
              images
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* DateTime Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

export default EventStep2;
