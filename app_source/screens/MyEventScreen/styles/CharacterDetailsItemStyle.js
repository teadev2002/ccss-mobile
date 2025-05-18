import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    elevation: 1,
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  subAccordionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  infoBox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  infoItem: {
    fontSize: 14,
    color: "#444",
  },
  image: {
    width: 100,
    height: 180,
    borderRadius: 10,
    margin: 12,
    alignSelf: "center",
    backgroundColor: "#eee",
  },
  dateBox: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
});

export default styles;