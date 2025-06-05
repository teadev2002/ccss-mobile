import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MyRentalCostumeService from "../../apiServices/MyCostumeService/MyRentalCostumeService";

const RefundConfirmPopup = ({ visible, onClose, contractId }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [reason, setReason] = useState("");

  const requestPhotoPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Quyền bị từ chối",
        "Ứng dụng cần quyền truy cập thư viện ảnh để chọn hình ảnh. Vui lòng cấp quyền trong cài đặt thiết bị."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPhotoPermission();
    if (!hasPermission) {
      return;
    }

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

  const refundContract = async (contractId, reason, images) => {
    try {
      // Chuyển đổi images thành định dạng phù hợp cho API (có uri, type, name)
      const formattedImages = images.map((image, index) => ({
        uri: image.uri,
        type: "image/png",
        name: `refund_image_${index}.png`,
      }));

      // Gọi API thông qua MyRentalCostumeService
      const response = await MyRentalCostumeService.updateDeliveryContract(
        contractId,
        "Refund", // Status
        formattedImages, // Images
        reason // Reason
      );

      Alert.alert("Thành công", "Yêu cầu refund đã được gửi!");
      return response;
    } catch (error) {
      console.error("Lỗi khi gọi API refund:", error);
      Alert.alert("Lỗi", "Không thể gửi yêu cầu refund. Vui lòng thử lại.");
      throw error;
    }
  };

  const handleConfirm = async () => {
    if (!reason) {
      Alert.alert("Lỗi", "Vui lòng nhập lý do hoàn hàng!");
      return;
    }
    if (selectedImages.length === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một ảnh hoàn hàng!");
      return;
    }

    await refundContract(contractId, reason, selectedImages);
    onClose();
    setSelectedImages([]);
    setReason("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: "white", padding: 20, width: "90%", borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Refubd</Text>
          <Text>
            Status: <Text style={{ fontWeight: "bold", color: "red" }}>Refund</Text>
          </Text>

          <TextInput
            placeholder="Reason ..."
            value={reason}
            onChangeText={setReason}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
            }}
          />

          <TouchableOpacity
            onPress={pickImage}
            style={{
              marginVertical: 10,
              padding: 10,
              backgroundColor: "#e0e0e0",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "blue" }}>
              {selectedImages.length > 0 ? `Choose ${selectedImages.length} image` : "Choose image"}
            </Text>
          </TouchableOpacity>

          {selectedImages.length > 0 && (
            <ScrollView horizontal style={{ marginBottom: 10 }}>
              {selectedImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 100, marginRight: 10 }}
                />
              ))}
            </ScrollView>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
  <View style={{ flex: 1, marginRight: 5 }}>
    <Button title="Confirm Refund" onPress={handleConfirm} />
  </View>
  <View style={{ flex: 1, marginLeft: 5 }}>
    <Button
      title="Close"
      color="red"
      onPress={() => {
        onClose();
        setSelectedImages([]);
        setReason("");
      }}
    />
  </View>
</View>
        </View>
      </View>
    </Modal>
  );
};

export default RefundConfirmPopup;