import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 16,
  backgroundColor: "#fff",
  paddingBottom: 35, 
},
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  qtyInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 6,
    width: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  noteInput: {
  marginTop: 6,
  borderWidth: 1,
  borderColor: "#bbb",
  borderRadius: 6,
  padding: 6,
  width: "100%",
  backgroundColor: "#fafafa",
},

});

export default styles;