import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    height: 200,  // Chiều cao ban đầu của header
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  // --- Cập nhật style tiêu đề từng section ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 16,
    marginLeft: 10,
    color: "#222",
    borderLeftWidth: 4,
    borderLeftColor: "#007bff", // xanh nổi bật
    paddingLeft: 10,
  },

  // Style wrapper mỗi event (để tạo card bo góc, shadow)
  eventItemWrapper: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,            // shadow android
    shadowColor: "#000",     // shadow iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: "hidden",
  },

  

  statusTagContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
  },
  eventContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  dateContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 6,
    borderRadius: 6,
  },
  dateMonth: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  eventDetails: {
    padding: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusTagContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  statusTag: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  moreButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    padding: 8,
  },
  expiredTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#dc3545",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  expiredText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
  },

  headerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lớp phủ tối phía trên ảnh
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Đảm bảo content nổi trên background
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  cartButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  eventContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  eventImage: {
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dateContainer: {
    backgroundColor: "rgba(4, 4, 4, 0.61)",
    padding: 8,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dateMonth: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "bold",
  },
  dateDay: {
    fontSize: 24,
    color: "#ccc",
    fontWeight: "bold",
  },
  eventDetails: {
    justifyContent: "flex-end",
    marginLeft: -90,
    position: "absolute",
    bottom: 10,
    left: 150,
  },
  eventName: {
    textAlign: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  eventPrice: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
  },
  moreButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  cartButton: {
    position: "absolute",
    top: 25,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  expiredTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#dc3545", // đỏ nhẹ
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  expiredText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default styles;
