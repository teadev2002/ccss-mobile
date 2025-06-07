import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";

const UpdateRefundScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { refundData } = route.params;

  const [refundDetails, setRefundDetails] = useState(null);
  const [numberBank, setNumberBank] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountBankName, setAccountBankName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefundDetails = async () => {
      try {
        const response = await MyRentalCostumeService.getContractRefundByContractId(refundData.contractId);
        setRefundDetails(response);
        setNumberBank(response.numberBank || "");
        setBankName(response.bankName || "");
        setAccountBankName(response.accountBankName || "");
      } catch (error) {
        console.error("Error fetching refund details:", error.message);
        Alert.alert("Error", "Failed to load refund details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRefundDetails();
  }, [refundData.contractId]);

  const handleUpdate = async () => {
    if (!refundDetails?.contractRefundId || !refundDetails?.contractId) {
      Alert.alert("Invalid Data", "Refund information is invalid. Please try again.");
      return;
    }

    if (!numberBank.trim() || !bankName.trim() || !accountBankName.trim()) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    try {
      await MyRentalCostumeService.updateContractRefund(
        refundDetails.contractRefundId,
        refundDetails.contractId,
        numberBank,
        bankName,
        accountBankName
      );
      Alert.alert("Success", "Refund information updated successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Update error:", error.message);
      Alert.alert("Update Failed", "An error occurred while updating refund details.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading refund details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Refund Information</Text>

      {/* Hiển thị ảnh nếu có */}
      {refundDetails?.image && (
        <Image
          source={{ uri: refundDetails.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <View style={styles.inputRow}>
        <Text style={styles.label}>Bank Account Number:</Text>
        <TextInput
          style={styles.input}
          value={numberBank}
          onChangeText={setNumberBank}
          placeholder="Enter bank account number"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Bank Name:</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="Enter bank name"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Account Holder:</Text>
        <TextInput
          style={styles.input}
          value={accountBankName}
          onChangeText={setAccountBankName}
          placeholder="Enter account holder name"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputRow: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  updateButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
});

export default UpdateRefundScreen;
