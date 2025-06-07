import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: "#4F46E5",
  secondary: "#6B7280",
  accent: "#10B981",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  error: "#EF4444",
  warning: "#FBBF24",
  success: "#10B981",
};

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎉 Review Your Event</Text>

      {/* Package Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 Package Information</Text>
        <View style={styles.card}>
          <DetailRow
            label="Package"
            value={selectedPackage?.packageName || "N/A"}
            icon="cube-outline"
          />
          <DetailRow
            label="Price"
            value={`${packagePrice.toLocaleString()} VND`}
            icon="cash-outline"
          />
        </View>
      </View>

      {/* Event Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Event Details</Text>
        <View style={styles.card}>
          <DetailRow label="Location" value={location} icon="location-outline" />
          <DetailRow label="Start" value={`${startDate} ${startTime}`} icon="calendar-outline" />
          <DetailRow label="End" value={`${endDate} ${endTime}`} icon="calendar-outline" />
          <DetailRow label="Total Days" value={`${totalDays}`} icon="time-outline" />
          <DetailRow label="Description" value={description} icon="chatbubble-outline" multiline />
        </View>
      </View>

      {/* Selected Characters Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧙 Selected Characters</Text>
        <View style={styles.card}>
          {selectedCharacters.length === 0 ? (
            <Text style={styles.emptyText}>No characters selected.</Text>
          ) : (
            selectedCharacters.map((item, idx) => {
              const char = getCharInfo(item.characterId);
              return (
                <View key={idx} style={styles.charBox}>
                  <Text style={styles.charName}>{char.characterName || "Unknown"}</Text>
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
      </View>

      {/* Price Range Slider Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Price Range</Text>
        <View style={styles.card}>
          <Text style={styles.sliderLabel}>
            {priceRange[0].toLocaleString()} VND - {priceRange[1].toLocaleString()} VND
          </Text>
          <MultiSlider
            values={priceRange}
            onValuesChange={setPriceRange}
            min={15000}
            max={50000}
            step={1000}
            selectedStyle={styles.sliderSelected}
            unselectedStyle={styles.sliderUnselected}
            markerStyle={styles.sliderMarker}
            trackStyle={styles.sliderTrack}
          />
        </View>
      </View>

      {/* Pricing Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Pricing Summary</Text>
        <View style={styles.card}>
          <DetailRow
            label="Total Character Price"
            value={`${totalCharacterPrice.toLocaleString()} VND`}
            icon="people-outline"
          />
          <DetailRow
            label="Package Price"
            value={`${packagePrice.toLocaleString()} VND`}
            icon="cube-outline"
          />
          <View style={styles.divider} />
          <DetailRow
            label="Estimated Total"
            value={`${estimatedPrice.toLocaleString()} VND`}
            icon="pricetag-outline"
            highlight
          />
        </View>
      </View>

      {/* Terms & Conditions Link */}
      <TouchableOpacity
        onPress={() => setShowTermsModal(true)}
        style={styles.termsLink}
        activeOpacity={0.7}
      >
        <Text style={styles.termsText}>📄 View Terms & Conditions</Text>
      </TouchableOpacity>

      {/* Agree Checkbox */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          style={styles.checkbox}
          activeOpacity={0.7}
        >
          <Ionicons
            name={agreed ? "checkbox" : "square-outline"}
            size={24}
            color={agreed ? COLORS.accent : COLORS.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>I agree to the terms and conditions</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goBackStep} style={styles.backButton}>
          <LinearGradient
            colors={["#6B7280", "#4B5563"]}
            style={styles.buttonGradient}
          >
            <Ionicons name="arrow-back-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Back</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!agreed) {
              alert("Please agree to the terms to proceed.");
              return;
            }
            goNextStep({ priceRange });
          }}
          style={styles.nextButton}
        >
          <LinearGradient
            colors={[COLORS.primary, "#7C3AED"]}
            style={styles.buttonGradient}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Finish</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions Modal */}
      <Modal visible={showTermsModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={[COLORS.primary, "#7C3AED"]}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Terms & Conditions</Text>
              <TouchableOpacity
                onPress={() => setShowTermsModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close-circle-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>
                • All bookings are subject to availability.{"\n"}
                • Event details must be accurate and complete.{"\n"}
                • Cancellations must be made 48 hours in advance.{"\n"}
                • Additional fees may apply for last-minute changes.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const DetailRow = ({ label, value, multiline, highlight, icon }) => (
  <View style={styles.row}>
    {icon && <Ionicons name={icon} size={20} color={COLORS.primary} />}
    <Text style={styles.rowLabel}>{label}</Text>
    <Text
      style={[
        styles.rowValue,
        multiline && { lineHeight: 22 },
        highlight && { fontWeight: "700", color: COLORS.error },
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginVertical: 20,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textSecondary,
    flex: 0.4,
    marginLeft: 8,
  },
  rowValue: {
    fontSize: 16,
    color: COLORS.text,
    flex: 0.6,
    textAlign: "right",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 12,
  },
  charBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  charName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  charDetail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  charNote: {
    fontSize: 13,
    color: COLORS.secondary,
    fontStyle: "italic",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 12,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 12,
  },
  sliderSelected: {
    backgroundColor: COLORS.primary,
  },
  sliderUnselected: {
    backgroundColor: "#E5E7EB",
  },
  sliderMarker: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
  termsLink: {
    alignItems: "center",
    marginVertical: 16,
  },
  termsText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 16,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    margin: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  modalCloseButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  modalBody: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
});

export default EventStep4;