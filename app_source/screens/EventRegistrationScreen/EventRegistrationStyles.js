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
    backgroundColor: "rgba(255, 255, 255, 0.61)",
    padding: 8,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dateMonth: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  dateDay: {
    fontSize: 24,
    color: "#000",
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
