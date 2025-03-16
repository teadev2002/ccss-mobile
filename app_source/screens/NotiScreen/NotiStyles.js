import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    marginTop: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff", // Nền trắng
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
    color: "#000",
    textTransform: "uppercase", // Chữ in hoa
  },
  notificationItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Đường viền dưới màu xám nhạt
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Hình tròn
    marginRight: 15,
    backgroundColor: "#ccc", // Màu nền cho avatar nếu không có hình
  },
  textContainer: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: "#000",
    flexWrap: "wrap", // Cho phép xuống dòng
  },
  username: {
    fontWeight: "bold", // Tên người dùng đậm
  },
  timeText: {
    fontSize: 14,
    color: "#888", // Màu xám cho thời gian
    marginTop: 5,
  },
});

export default styles;
