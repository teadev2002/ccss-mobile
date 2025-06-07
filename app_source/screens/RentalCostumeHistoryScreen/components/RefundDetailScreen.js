import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";

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

const RefundDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { refundData } = route.params;
  const [refundDetails, setRefundDetails] = useState(null);
  const [refundImages, setRefundImages] = useState([]);

  useEffect(() => {
    const fetchRefundDetailsAndImages = async () => {
      try {
        const refundResponse = await MyRentalCostumeService.getContractRefundByContractId(refundData.contractId);
        setRefundDetails({ ...refundResponse, completed: refundResponse.status === "Completed" });

        const imagesResponse = await MyRentalCostumeService.getImageRefundMoneybyContractId(refundData.contractId);
        setRefundImages(imagesResponse || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchRefundDetailsAndImages();
  }, [refundData.contractId]);

  const handleComplete = async () => {
    try {
      await MyRentalCostumeService.updateCompleteRefund(refundDetails.contractId);
      setRefundDetails({ ...refundDetails, status: "Completed", completed: true });
      alert("Marked as completed successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error completing refund:", error.message);
      alert("Failed to complete refund!");
    }
  };

  if (!refundDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading refund details...</Text>
      </View>
    );
  }

  const renderRow = (label, value, iconName) => (
    <View style={styles.detailRow}>
      <Ionicons name={iconName} size={20} color={COLORS.primary} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  );

  const showCompleteButton = refundImages.length > 0 && refundDetails.status !== "Completed" && !refundDetails.completed;
  const isCompleted = refundDetails.status === "Paid" || refundDetails.completed;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Gradient and Go Back Button */}
      <LinearGradient
        colors={[COLORS.primary, "#7C3AED"]}
        style={styles.headerContainer}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Refund Details</Text>
      </LinearGradient>

      {/* Refund Info Card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Refund Information</Text>
        <View style={styles.card}>
          {renderRow("Bank Number:", refundDetails.numberBank, "card-outline")}
          {renderRow("Bank Name:", refundDetails.bankName, "business-outline")}
          {renderRow("Account Holder:", refundDetails.accountBankName, "person-outline")}
          {renderRow("Price Damage:", refundDetails.price?.toLocaleString(), "cash-outline")}
          {renderRow("Amount:", refundDetails.amount?.toLocaleString(), "wallet-outline")}
          {renderRow("Description:", refundDetails.description, "chatbubble-outline")}
          {renderRow("Type:", refundDetails.type, "pricetag-outline")}
          {renderRow("Status:", refundDetails.status, "checkmark-circle-outline")}
          {renderRow("Created Date:", refundDetails.createDate, "calendar-outline")}
          {renderRow("Updated Date:", refundDetails.updateDate || "Not Yet", "calendar-outline")}
        </View>
      </View>

      {/* Attached Images Section */}
      {refundImages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attached Images</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
            {refundImages.map((item, index) =>
              item.urlImage && typeof item.urlImage === "string" && item.urlImage.trim() !== "" ? (
                <Image
                  key={index}
                  source={{ uri: item.urlImage }}
                  style={styles.image}
                  resizeMode="cover"
                  onError={() =>
                    console.log(`Image ${index + 1} failed to load: ${item.urlImage}`)
                  }
                />
              ) : (
                <View key={index} style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={40} color={COLORS.secondary} />
                  <Text style={styles.placeholderText}>Invalid Image</Text>
                </View>
              )
            )}
          </ScrollView>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        {isCompleted ? (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-done-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        ) : showCompleteButton ? (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <LinearGradient
              colors={[COLORS.success, "#059669"]}
              style={styles.buttonGradient}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Complete</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.waitingBadge}>
            <Ionicons name="hourglass-outline" size={20} color="#FFFFFF" />
            <Text style={styles.waitingText}>Waiting Confirm</Text>
          </View>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <LinearGradient
            colors={[COLORS.error, "#DC2626"]}
            style={styles.buttonGradient}
          >
            <Ionicons name="close-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Close</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 10,
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
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginLeft: 8,
    flex: 0.4,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    flex: 0.6,
  },
  imageScroll: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  placeholderText: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
  },
  completeButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  closeButton: {
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
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  waitingBadge: {
    flex: 1,
    marginRight: 10,
    backgroundColor: COLORS.warning,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  completedBadge: {
    flex: 1,
    marginRight: 10,
    backgroundColor: COLORS.success,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  waitingText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  completedText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
});

export default RefundDetailScreen;