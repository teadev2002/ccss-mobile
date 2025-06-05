import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";

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
        setRefundDetails(refundResponse);

        const imagesResponse = await MyRentalCostumeService.getImageRefundMoneybyContractId(refundData.contractId);
        setRefundImages(imagesResponse || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
      }
    };
    fetchRefundDetailsAndImages();
  }, [refundData.contractId]);

  const handleComplete = async () => {
    try {
      await MyRentalCostumeService.updateCompleteRefund(
          refundDetails.contractId,);
      setRefundDetails({ ...refundDetails, status: "Completed" }); // Cập nhật trạng thái trên giao diện
      alert("Hoàn tất thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi hoàn tất:", error.message);
      alert("Không thể hoàn tất hoàn tiền!");
    }
  };

  if (!refundDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Refund Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>BANK NUMBER:</Text>
        <Text style={styles.value}>{refundDetails.numberBank || "..."}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>BANK NAME:</Text>
        <Text style={styles.value}>{refundDetails.bankName || "..."}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>ACCOUNT HOLDER:</Text>
        <Text style={styles.value}>{refundDetails.accountBankName || "..."}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>PRICE DAMAGE:</Text>
        <Text style={styles.value}>{refundDetails.price?.toLocaleString()}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>AMOUNT:</Text>
        <Text style={styles.value}>{refundDetails.amount?.toLocaleString()}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>DESCRIPTION:</Text>
        <Text style={styles.value}>{refundDetails.description}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>TYPE:</Text>
        <Text style={styles.value}>{refundDetails.type}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>STATUS:</Text>
        <Text style={styles.value}>{refundDetails.status}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>CREATED DATE:</Text>
        <Text style={styles.value}>{refundDetails.createDate}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>UPDATED DATE:</Text>
        <Text style={styles.value}>{refundDetails.updateDate || "Not Yet"}</Text>
      </View>

      <View style={styles.buttonRow}>
        {refundImages.length > 0 && (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.buttonText}>Completed</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    width: 150,
  },
  value: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default RefundDetailScreen;