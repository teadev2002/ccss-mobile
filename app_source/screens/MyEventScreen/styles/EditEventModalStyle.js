import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    color: "#1a1a2e",
  },
  subHeader: {
    fontSize: 17,
    fontWeight: "600",
    marginVertical: 14,
    marginLeft: 4,
    color: "#333",
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginTop: 4,
  },
  characterRow: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  charText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },

  label: {
    fontWeight: "bold",
    color: "#555",
  },
  qtyInput: {
    borderWidth: 1,
    width: 50,
    textAlign: "center",
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
  detailItem: {
    fontSize: 14.5,
    marginBottom: 4,
    color: "#444",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    paddingBottom: 30,
  },
  footerBtn: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});

export default styles;
