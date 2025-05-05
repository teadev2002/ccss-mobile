import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: "#444",
    marginBottom: 8,
  },
  stock: {
    color: "#888",
    marginBottom: 12,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  quantityInput: {
    width: 50,
    height: 35,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 5,
    color: "#333",
  },
  
  cancelButton: {
    flex: 1,
    backgroundColor: "#f44336",
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
