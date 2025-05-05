import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  paymentOption: {
    backgroundColor: "#f0f4ff",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#3b82f6",
    alignItems: "center",
  },
  paymentText: {
    fontSize: 16,
    color: "#1d4ed8",
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 15,
    color: "#888",
  },
});

export default styles;
