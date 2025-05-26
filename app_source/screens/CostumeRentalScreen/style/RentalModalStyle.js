import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
},
modalContent: {
  width: "90%",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
  maxHeight: "85%",
},
modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
},
modalInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  marginVertical: 8,
},
label: {
  fontWeight: "bold",
  marginTop: 12,
},
termsRow: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
},
checkbox: {
  width: 20,
  height: 20,
  borderWidth: 1,
  borderColor: "#ccc",
  marginRight: 10,
},
termsText: {
  flex: 1,
  fontSize: 14,
},
modalButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},
modalCancelButton: {
  backgroundColor: "#ccc",
  padding: 12,
  borderRadius: 8,
  flex: 1,
  marginRight: 8,
  alignItems: "center",
},
modalSubmitButton: {
  backgroundColor: "#22668a",
  padding: 12,
  borderRadius: 8,
  flex: 1,
  marginLeft: 8,
  alignItems: "center",
},
modalButtonText: {
  color: "#fff",
  fontWeight: "bold",
},

quantityRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
},

quantityButton: {
  backgroundColor: "#22668a",
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 6,
},

quantityButtonText: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
},

quantityInput: {
  flex: 1,
  marginHorizontal: 10,
  textAlign: "center",
},


});

export default styles;