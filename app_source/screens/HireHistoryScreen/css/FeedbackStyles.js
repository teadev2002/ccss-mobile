import { StyleSheet } from "react-native";

const FeedbackStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22668a",
  },
  backButton: {
    marginRight: 12,
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  feedbackContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  feedbackSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginTop: 10,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  feedbackInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fafafa",
    textAlignVertical: "top",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#22668a",
    paddingVertical: 10,
    borderRadius: 16,
  },
});

export default FeedbackStyles;
