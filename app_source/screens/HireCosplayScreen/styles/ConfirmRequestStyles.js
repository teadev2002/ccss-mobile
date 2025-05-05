import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  timeEntry: {
    fontSize: 15,
    color: "#444",
    marginLeft: 8,
  },
  cosplayerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cosplayerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cosplayerImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  cosplayerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  cosplayerDetail: {
    fontSize: 14,
    color: "#444",
  },
  removeIcon: {
    color: "red",
    fontSize: 20,
    paddingHorizontal: 8,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#22668a",
    marginTop: 12,
  },
  depositOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  depositOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  depositOptionActive: {
    backgroundColor: "#22668a",
  },
  depositText: {
    color: "#333",
  },
  depositTextActive: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 80,
  },
  dropdown: {
    backgroundColor: "#fff",
    maxHeight: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 10,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backLink: {
    marginTop: 16,
    alignSelf: "center",
  },
  backLinkText: {
    color: "#22668a",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default styles;
