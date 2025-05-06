import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "../css/Step4Style"; // Adjust the path to your styles

const EventStep4 = ({ eventData, goBackStep }) => {
  const {
    selectedPackage,
    eventName,
    eventTheme,
    location,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    venueDescription,
    images,
    useCosplayerList,
    selectedCosplayers = [],
    manualQuantity = 0,
    discount = "",
    setDiscount,
    customDiscount = "",
    setCustomDiscount,
    termsAgreed,
    setTermsAgreed,
  } = eventData;

  const [showTermsModal, setShowTermsModal] = useState(false);

  const getFormattedDateTime = (date, time) => {
    if (!date || !time) return "N/A";
    const dateStr = new Date(date).toLocaleDateString();
    return `${dateStr} ${time}`;
  };

  const calculateTotalPrice = () => {
    const pricePerCosplayer = selectedPackage?.pricePerCosplayer || 100;
    const quantity = useCosplayerList ? selectedCosplayers.length : manualQuantity;
    return quantity * pricePerCosplayer;
  };

  const applyDiscount = () => {
    const total = calculateTotalPrice();
    const discountValue = parseFloat(customDiscount || discount || "0");
    return Math.max(total - (isNaN(discountValue) ? 0 : discountValue), 0);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Your Event</Text>

      <View style={styles.card}>
        <Text><Text style={styles.label}>Selected Package:</Text> {selectedPackage?.name || "N/A"}</Text>
        <Text><Text style={styles.label}>Event Name:</Text> {eventName}</Text>
        <Text><Text style={styles.label}>Event Theme:</Text> {eventTheme}</Text>
        <Text><Text style={styles.label}>Location:</Text> {location}</Text>
        <Text><Text style={styles.label}>Start:</Text> {getFormattedDateTime(startDate, startTime)}</Text>
        <Text><Text style={styles.label}>End:</Text> {getFormattedDateTime(endDate, endTime)}</Text>
        <Text><Text style={styles.label}>Description:</Text> {description}</Text>
        <Text><Text style={styles.label}>Venue Description:</Text> {venueDescription}</Text>
        <Text><Text style={styles.label}>Images:</Text> {images?.length || 0} uploaded</Text>

        <Text style={{ marginTop: 10 }}>
          <Text style={styles.label}>Cosplayers:</Text>{" "}
          {useCosplayerList
            ? selectedCosplayers
                .map(sc => `${sc.cosplayer.name} as ${sc.character} (Note: ${sc.note || "None"})`)
                .join(", ")
            : manualQuantity}
        </Text>

        {useCosplayerList && (
          <Text style={styles.label}>Total Price (before discount): ${calculateTotalPrice()}</Text>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Discount Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter discount code"
            value={discount}
            onChangeText={setDiscount}
            editable={!customDiscount}
          />
          <TextInput
            style={styles.input}
            placeholder="Or enter custom discount"
            keyboardType="numeric"
            value={customDiscount}
            onChangeText={setCustomDiscount}
          />
        </View>

        {useCosplayerList && (discount || customDiscount) && (
          <Text style={styles.label}>
            Total Price (after discount): ${applyDiscount()}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setShowTermsModal(true)}
          style={styles.linkButton}
        >
          <Text style={{ color: "blue" }}>View Terms & Conditions</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setTermsAgreed(!termsAgreed)}
            style={styles.checkbox}
          >
            <Text style={{ fontSize: 16 }}>{termsAgreed ? "☑" : "☐"}</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 8 }}>I agree to the terms and conditions</Text>
        </View>
      </View>

      <Modal visible={showTermsModal} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </Text>
          <Button title="Close" onPress={() => setShowTermsModal(false)} />
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};



export default EventStep4;
