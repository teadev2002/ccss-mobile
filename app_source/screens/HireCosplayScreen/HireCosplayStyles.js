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
    // Phần tử trống này giúp căn giữa tiêu đề khi dùng justifyContebt: 'space-between'
    // Kích thước của nó nên tương đương với nút back để cân bằng
    width: 24 + 5 * 2, // size icon + padding*2
  },
  content: {
    flex: 1, // Phần nội dung chiếm hết không gian còn lại
    padding: 20, // Padding cho nội dung
    justifyContent: "center", // Căn giữa nội dung (tạm thời)
    alignItems: "center", // Căn giữa nội dung (tạm thời)
  },
});
export default styles;
