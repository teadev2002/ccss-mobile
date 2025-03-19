import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    width: "100%",
    justifyContent: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%", // Để ImageBackground khớp với Animated.View
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    flex: 1, // Đảm bảo tiêu đề chiếm phần còn lại của không gian
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
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
});

export default styles;
