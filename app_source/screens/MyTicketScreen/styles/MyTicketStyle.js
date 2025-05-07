import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // nền sáng nhẹ dễ chịu
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    color: "#333",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
    lineHeight: 20,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
  usedStatus: {
    color: "#888",
  },
  activeStatus: {
    color: "#28a745",
  },
  button: {
    marginTop: 12,
    borderColor: "#6c63ff",
    borderWidth: 1,
    borderRadius: 8,
  },
  noTicketText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 30,
  },
  // --- Modal ---
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "#6c63ff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalHeaderLine: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalEventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modalLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    width: 100,
  },
  modalValue: {
    fontSize: 14,
    color: "#555",
    flexShrink: 1,
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ff5c5c",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default styles;
