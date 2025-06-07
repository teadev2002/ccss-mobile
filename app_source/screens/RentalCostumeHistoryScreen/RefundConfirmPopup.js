import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyRentalCostumeService from "../../apiServices/MyCostumeService/MyRentalCostumeService";

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

const RefundConfirmPopup = ({ visible, onClose, contractId, onSuccess }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [reason, setReason] = useState("");

  const requestPhotoPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "The app needs access to your photo library to select images. Please grant permission in your device settings."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPhotoPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImages(result.assets);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const refundContract = async (contractId, reason, images) => {
    try {
      const formattedImages = images.map((image, index) => ({
        uri: image.uri,
        type: "image/png",
        name: `refund_image_${index}.png`,
      }));

      const response = await MyRentalCostumeService.updateDeliveryContract(
        contractId,
        "Refund",
        formattedImages,
        reason
      );

      Alert.alert("Success", "Refund request has been submitted!");
      return response;
    } catch (error) {
      console.error("Error submitting refund:", error);
      Alert.alert("Error", "Failed to submit refund request. Please try again.");
      throw error;
    }
  };

  const handleConfirm = async () => {
    if (!reason) {
      Alert.alert("Error", "Please enter a reason for the refund!");
      return;
    }
    if (selectedImages.length === 0) {
      Alert.alert("Error", "Please select at least one refund image!");
      return;
    }

    await refundContract(contractId, reason, selectedImages);
    onSuccess?.(); // Gọi callback onSuccess nếu có
    onClose();
    setSelectedImages([]);
    setReason("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Delivery Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status: </Text>
            <Text style={styles.statusValue}>Refund</Text>
          </View>

          <TextInput
            placeholder="Enter reason for refund"
            value={reason}
            onChangeText={setReason}
            style={styles.input}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <LinearGradient
              colors={["#4F46E5", "#7C3AED"]}
              style={styles.imagePickerGradient}
            >
              <Ionicons name="image-outline" size={20} color="#FFFFFF" />
              <Text style={styles.imagePickerText}>
                {selectedImages.length > 0
                  ? `Selected ${selectedImages.length} Image(s)`
                  : "Choose Images"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {selectedImages.length > 0 && (
            <ScrollView horizontal style={styles.imageScroll}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <LinearGradient
                colors={["#4F46E5", "#7C3AED"]}
                style={styles.buttonGradient}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => {
              onClose();
              setSelectedImages([]);
              setReason("");
            }}>
              <LinearGradient
                colors={["#EF4444", "#DC2626"]}
                style={styles.buttonGradient}
              >
                <Ionicons name="close-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Close</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    padding: 20,
    width: "90%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.error,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: "#F9FAFB",
    textAlignVertical: "top",
  },
  imagePickerButton: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  imagePickerGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "center",
  },
  imagePickerText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "600",
  },
  imageScroll: {
    marginBottom: 15,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmButton: {
    flex: 1,
    marginRight: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  closeButton: {
    flex: 1,
    marginLeft: 5,
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
    marginLeft: 8,
    fontWeight: "600",
  },
};

export default RefundConfirmPopup;