import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, // Giúp hiển thị nội dung an toàn dưới tai thỏ/status bar
  StatusBar, // Để tùy chỉnh thanh status bar (tùy chọn)
} from "react-native";

// Import thư viện icon (đảm bảo bạn đã cài đặt @expo/vector-icons)
import { Ionicons } from "@expo/vector-icons";

// Import hook để sử dụng navigation (nếu bạn dùng React Navigation)
// Giả sử bạn đang dùng React Navigation V5 hoặc V6
import { useNavigation } from "@react-navigation/native";

const HireCosplay = () => {
  // Lấy đối tượng navigation để có thể điều hướng
  const navigation = useNavigation();

  // Hàm xử lý khi nhấn nút Back
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      // Kiểm tra xem có màn hình trước đó không
      navigation.goBack();
    } else {
      // Xử lý trường hợp không thể quay lại (ví dụ: đây là màn hình đầu tiên)
      console.log("Không thể quay lại màn hình trước.");
      // Có thể hiển thị thông báo hoặc không làm gì cả
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header tùy chỉnh */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hire Cosplayer</Text>

        <View style={styles.placeholder} />
      </View>

      {/* Nội dung chính của màn hình */}
      <View style={styles.content}>
        <Text>Nội dung màn hình Thuê Cosplay ở đây...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Đảm bảo SafeAreaView chiếm toàn bộ màn hình
    backgroundColor: "#FFFFFF", // Màu nền chung cho màn hình
  },
  header: {
    height: 60, // Chiều cao của header
    flexDirection: "row", // Sắp xếp các item theo hàng ngang
    alignItems: "center", // Căn giữa các item theo chiều dọc
    justifyContent: "space-between", // Phân bố không gian giữa các item
    paddingHorizontal: 15, // Padding ngang cho header
    borderBottomWidth: 1, // Đường viền dưới header
    borderBottomColor: "#E0E0E0", // Màu đường viền
    backgroundColor: "#FFFFFF", // Màu nền header (có thể khác màu nền chính)
  },
  backButton: {
    padding: 5, // Tăng vùng nhấn cho nút back
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    // Nếu muốn tiêu đề luôn ở giữa, bạn có thể bỏ justifyContebt: 'space-between'
    // và thêm position: 'absolute', left: 0, right: 0, textAlign: 'center'
    // nhưng cần đảm bảo nút back không bị đè lên
  },
  placeholder: {
    width: 24 + 5 * 2, // size icon + padding*2
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HireCosplay;
