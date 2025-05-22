import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: { padding: 0, backgroundColor: "#fdfdfd", flex: 1 },
  wrapper: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3c3c3c",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#22668a",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  footerButtonGroup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: "center",
  },

  btnPrimary: {
    backgroundColor: "#22668a",
  },

  btnPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  btnSecondary: {
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#f2f2f2",
  },

  btnSecondaryText: {
    color: "#444",
    fontWeight: "600",
  },

  rowLabel: { fontWeight: "500", color: "#555" },
  rowValue: { color: "#333", flexShrink: 1, textAlign: "right" },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
  },
  charBox: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f3f6fa",
    borderRadius: 8,
  },
  charName: { fontWeight: "600", fontSize: 15, marginBottom: 4 },
  charDetail: { fontSize: 13, color: "#444" },
  charNote: { fontStyle: "italic", fontSize: 12, color: "#777", marginTop: 2 },
  empty: { fontStyle: "italic", color: "#888", paddingLeft: 6 },
  linkBtn: { alignItems: "center", marginTop: 16 },
  linkText: { color: "#1e90ff", fontWeight: "500" },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  checkboxBox: { marginRight: 8 },
  checkboxText: { fontSize: 18 },
  agreeText: { fontSize: 14 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  primaryBtn: {
    backgroundColor: "#22668a",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  primaryBtnText: { color: "#fff", fontWeight: "bold" },
  secondaryBtn: {
    borderColor: "#999",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  secondaryBtnText: { color: "#444", fontWeight: "600" },
  modal: { padding: 20, backgroundColor: "#fff" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  modalContent: { fontSize: 14, color: "#333", lineHeight: 22 },
});
