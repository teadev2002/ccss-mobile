import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    alignItems: "center",
  },
  characterList: {
    width: "100%",
    maxWidth: 400,
  },
  characterCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  characterCardSelected: {
    backgroundColor: "#e6f0ff",
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#eee",
    position: "relative",
  },
  characterImage: {
    width: "100%",
    height: "100%",
  },
  checkmark: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#22668a",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  checkmarkText: {
    color: "#fff",
    fontSize: 12,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  characterMeta: {
    fontSize: 14,
    color: "#555",
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
