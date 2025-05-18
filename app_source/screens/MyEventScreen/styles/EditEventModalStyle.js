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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  charText: {
    flex: 1,
    fontSize: 14.5,
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
