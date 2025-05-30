import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "600" },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 8 },
  label: { fontWeight: "600", marginTop: 8 },
  costumeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  addBtn: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
  costumeCard: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  removeBtn: {
    backgroundColor: "#d9534f",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  saveText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
  },

});
