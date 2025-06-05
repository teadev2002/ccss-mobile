import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";
import styles from "../styles/EditRentalStyle";

const UpdateRefundScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { refundData } = route.params;
  const [refundDetails, setRefundDetails] = useState(null);
  const [numberBank, setNumberBank] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountBankName, setAccountBankName] = useState("");

  useEffect(() => {
    const fetchRefundDetails = async () => {
      try {
        const response = await MyRentalCostumeService.getContractRefundByContractId(refundData.contractId);
        setRefundDetails(response);
        setNumberBank(response.numberBank || "");
        setBankName(response.bankName || "");
        setAccountBankName(response.accountBankName || "");
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết hoàn tiền:", error.message);
      }
    };
    fetchRefundDetails();
  }, [refundData.contractId]);

  const handleUpdate = async () => {
    try {
      // Kiểm tra dữ liệu trước khi gửi
      if (!refundDetails.contractRefundId || !refundDetails.contractId) {
        alert("Dữ liệu hoàn tiền không hợp lệ. Vui lòng thử lại.");
        return;
      }
      if (!numberBank || !bankName || !accountBankName) {
        alert("Vui lòng nhập đầy đủ thông tin: Số tài khoản, Tên ngân hàng, và Chủ tài khoản.");
        return;
      }

      const updatedData = {
        ContractId: refundDetails.contractId,
      };
      console.log("Dữ liệu gửi lên:", {
        contractRefundId: refundDetails.contractRefundId,
        ContractId: updatedData.ContractId,
        NumberBank: numberBank,
        BankName: bankName,
        AccountBankName: accountBankName,
      });
      await MyRentalCostumeService.updateContractRefund(
        refundDetails.contractRefundId,
        updatedData.ContractId,
        numberBank,
        bankName,
        accountBankName
      );
      alert("Cập nhật thành công!");
      navigation.goBack();
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  };

  if (!refundDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Refund</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>BANK NUMBER:</Text>
        <TextInput
          style={styles.input}
          value={numberBank}
          onChangeText={setNumberBank}
          placeholder="Nhập số tài khoản..."
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>BANK NAME:</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="Nhập tên ngân hàng..."
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>ACCOUNT HOLDER:</Text>
        <TextInput
          style={styles.input}
          value={accountBankName}
          onChangeText={setAccountBankName}
          placeholder="Nhập tên chủ tài khoản..."
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.completeButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateRefundScreen;