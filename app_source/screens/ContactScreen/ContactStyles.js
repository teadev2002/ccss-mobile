import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    height: 60,
    backgroundColor: "#510545",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
    marginLeft: 10,
  },
  heroSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 25,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    maxWidth: 300,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "column",
  },
  infoCard: {
    marginBottom: 20,
    elevation: 5,
  },
  mapCard: {
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#510545",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  infoTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#510545",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  mapButton: {
    backgroundColor: "#510545",
    borderRadius: 30,
    paddingVertical: 5,
  },
});
