import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 30,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22668a",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 35,
    backgroundColor: "transparent",
  },
  scrollContent: {
    padding: 16,
  },
  detailContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#22668a",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  productItem: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
});

export default styles;
