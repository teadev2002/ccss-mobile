import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import styles from "../css/Step4Style";

const EventStep4 = ({ eventData, goBackStep, goNextStep }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [priceRange, setPriceRange] = useState([15000, 50000]);

  const {
    selectedPackage,
    location,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    selectedCharacters = [],
    allCharacters = [],
  } = eventData;

  const getCharInfo = (id) =>
    allCharacters.find((c) => c.characterId === id) || {};
  const getCharPrice = (id) => getCharInfo(id).price || 0;

  const totalCharacterPrice = selectedCharacters.reduce(
    (sum, item) => sum + getCharPrice(item.characterId) * item.quantity,
    0
  );
  const packagePrice = selectedPackage?.price || 0;

  const totalDays = Math.max(
    1,
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
  );

  const estimatedPrice = totalCharacterPrice * totalDays + packagePrice;

  return (
    <View style={styles.wrapper}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎉 Review Your Event</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 Package Info</Text>
        <DetailRow
          label="Package"
          value={selectedPackage?.packageName || "N/A"}
        />
        <DetailRow
          label="Price"
          value={`${packagePrice.toLocaleString()} VND`}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Event Details</Text>
        <DetailRow label="Location" value={location} />
        <DetailRow label="Start" value={`${startDate} ${startTime}`} />
        <DetailRow label="End" value={`${endDate} ${endTime}`} />
        <DetailRow label="Total Days" value={`${totalDays}`} />
        <DetailRow label="Description" value={description} multiline />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧙 Selected Characters</Text>
        {selectedCharacters.length === 0 ? (
          <Text style={styles.empty}>No characters selected.</Text>
        ) : (
          selectedCharacters.map((item, idx) => {
            const char = getCharInfo(item.characterId);
            return (
              <View key={idx} style={styles.charBox}>
                <Text style={styles.charName}>
                  {char.characterName || "Unknown"}
                </Text>
                <Text style={styles.charDetail}>
                  Price: {getCharPrice(item.characterId).toLocaleString()} VND
                </Text>
                <Text style={styles.charDetail}>Quantity: {item.quantity}</Text>
                {item.note ? (
                  <Text style={styles.charNote}>Note: {item.note}</Text>
                ) : null}
              </View>
            );
          })
        )}
      </View>

      {/* RANGE SLIDER */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Price Range</Text>
        <Text style={{ textAlign: "center", marginBottom: 6 }}>
          {priceRange[0].toLocaleString()} VND -{" "}
          {priceRange[1].toLocaleString()} VND
        </Text>
        <MultiSlider
          values={priceRange}
          onValuesChange={setPriceRange}
          min={15000}
          max={50000}
          step={1000}
          selectedStyle={{ backgroundColor: "#22668a" }}
          unselectedStyle={{ backgroundColor: "#ccc" }}
          markerStyle={{ backgroundColor: "#22668a" }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Pricing Summary</Text>
        <DetailRow
          label="Total Character Price"
          value={`${totalCharacterPrice.toLocaleString()} VND`}
        />
        <DetailRow
          label="Package Price"
          value={`${packagePrice.toLocaleString()} VND`}
        />
        <View style={styles.divider} />
        <DetailRow
          label="Estimated Total"
          value={`${estimatedPrice.toLocaleString()} VND`}
          highlight
        />
      </View>

      <TouchableOpacity
        onPress={() => setShowTermsModal(true)}
        style={styles.linkBtn}
      >
        <Text style={styles.linkText}>📄 View Terms & Conditions</Text>
      </TouchableOpacity>

      <View style={styles.checkboxRow}>
        <Text style={styles.agreeText}>
          I agree to the terms and conditions
        </Text>
      </View>

      {/* Modal */}
      <Modal visible={showTermsModal} animationType="slide">
        <ScrollView style={styles.modal}>
          <Text style={styles.modalTitle}>Terms & Conditions</Text>
          <Text style={styles.modalContent}>
            • All bookings are subject to availability.{"\n"}• Event details
            must be accurate and complete.{"\n"}• Cancellations must be made 48
            hours in advance.{"\n"}• Additional fees may apply for last-minute
            changes.
          </Text>
          <Button title="Close" onPress={() => setShowTermsModal(false)} />
        </ScrollView>
      </Modal>
    </ScrollView>

    {/* Fixed Footer Buttons */}
    <View style={styles.footerButtonGroup}>
      <TouchableOpacity
        onPress={goBackStep}
        style={[styles.btn, styles.btnSecondary]}
      >
        <Text style={styles.btnSecondaryText}>← Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (!agreed) {
            alert("Please agree to the terms to proceed.");
            return;
          }
          goNextStep({ priceRange });
        }}
        style={[styles.btn, styles.btnPrimary]}
      >
        <Text style={styles.btnPrimaryText}>Finish →</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const DetailRow = ({ label, value, multiline, highlight }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text
      style={[
        styles.rowValue,
        multiline && { flexWrap: "wrap" },
        highlight && { fontWeight: "bold", color: "#d1345b" },
      ]}
    >
      {value}
    </Text>
  </View>
);



export default EventStep4;
