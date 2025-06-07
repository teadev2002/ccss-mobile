import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import RefundConfirmPopup from "./RefundConfirmPopup";
import MyRentalCostumeService from "../../apiServices/MyCostumeService/MyRentalCostumeService";

const DeliveryTimelinePopup = ({ visible, onClose, contractImages }) => {
  const sortedImages = [...contractImages].reverse();
  const [showRefundPopup, setShowRefundPopup] = useState(false);
  const [currentImageForRefund, setCurrentImageForRefund] = useState(null);

  // Kiểm tra xem có trạng thái "Refund" trong danh sách không
  const hasRefundStatus = sortedImages.some(item => item.status === "Refund");

  const handleRefund = (item) => {
    setCurrentImageForRefund(item);
    setShowRefundPopup(true);
  };

  const handleConfirmRefund = async (image) => {
    const formData = new FormData();
    formData.append("contractId", currentImageForRefund.contractId);
    formData.append("status", "Refund");
    formData.append("image", {
      uri: image.uri,
      type: image.type,
      name: image.fileName || "refund.jpg",
    });

    try {
      await MyRentalCostumeService.refundContractImage(formData);
      Alert.alert("Thành công", "Bạn đã hoàn hàng!");
      setShowRefundPopup(false);
      onClose();
    } catch (e) {
      Alert.alert("Lỗi", "Không thể hoàn hàng.");
    }
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.deliveryOverlay}>
          <View style={styles.deliveryPopup}>
            <Text style={styles.deliveryTitle}>Delivery</Text>
            <ScrollView>
              {sortedImages?.map((item, index) => {
                // Xác định xem mục này có nên hiển thị dấu tích không
                // Dấu tích hiển thị cho tất cả các bước từ đầu đến trước bước "Refund"
                const showCheckmark = index === 0 || sortedImages.slice(0, index).every(i => i.status !== "Refund");

                return (
                  <View key={item.contractImageId} style={styles.deliveryStepContainer}>
                    <View style={styles.deliveryStepIndicator}>
                      {showCheckmark ? (
                        <View style={styles.deliveryStepIndicatorActive}>
                          <Text style={styles.deliveryStepCheckmark}>✔</Text>
                        </View>
                      ) : (
                        <View style={styles.deliveryStepIndicatorDot} />
                      )}
                      {index < sortedImages.length - 1 && (
                        <View style={styles.deliveryStepLine} />
                      )}
                    </View>
                    <View style={styles.deliveryStepContent}>
                      <Text>
                        Status:{" "}
                        <Text style={styles.deliveryStatus}>{item.status}</Text>
                      </Text>
                      <Text style={styles.deliveryDate}>
                        Start Date: {item.createDate}
                      </Text>
                      <Image
                        source={{ uri: item.urlImage }}
                        style={styles.deliveryStepImage}
                        resizeMode="contain"
                      />
                      {!hasRefundStatus && item.status === "Received" && (
                        <TouchableOpacity
                          style={styles.deliveryCloseButton}
                          onPress={() => handleRefund(item)}
                        >
                          <Text style={styles.deliveryCloseText}>Return costume</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.deliveryCloseButton}
              onPress={onClose}
            >
              <Text style={styles.deliveryCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <RefundConfirmPopup
        visible={showRefundPopup}
        onClose={() => setShowRefundPopup(false)}
        onConfirmRefund={handleConfirmRefund}
        contractId={currentImageForRefund?.contractId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  deliveryOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryPopup: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    maxHeight: "80%",
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  deliveryStepContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  deliveryStepIndicator: {
    width: 30,
    alignItems: "center",
  },
  deliveryStepIndicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2e86de",
    marginTop: 4,
  },
  deliveryStepIndicatorActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  deliveryStepCheckmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  deliveryStepLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#dcdcdc",
    marginTop: 2,
  },
  deliveryStepContent: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryStepStatusText: {
    fontSize: 14,
    color: "#333",
  },
  deliveryStepStatusTextActive: {
    fontWeight: "bold",
    color: "#28a745",
  },
  deliveryStepDateText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    marginBottom: 8,
  },
  deliveryStepImage: {
    width: "100%",
    height: 180,
    borderRadius: 6,
    marginBottom: 10,
  },
  deliveryCloseButton: {
    marginTop: 12,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deliveryCloseText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DeliveryTimelinePopup;