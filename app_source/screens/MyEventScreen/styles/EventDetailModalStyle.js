import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
    color: "#1a1a2e",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 14,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: "#1e90ff",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: "500",
    overflow: "hidden",
  },
  infoText: {
    fontSize: 14.5,
    marginBottom: 4,
    color: "#444",
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: 100,
    height: 180,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  timeLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 4,
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