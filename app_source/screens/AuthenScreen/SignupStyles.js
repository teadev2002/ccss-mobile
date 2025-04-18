import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
  },
  leftPanel: {
    marginBottom: 20,
  },
  welcomeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  welcomeText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "500",
  },
  panelTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  textAccent: {
    color: "#ffaf7b",
  },
  panelText: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: 15,
  },
  brandBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badgeItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "#fff",
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3a1c71",
    textAlign: "center",
    marginBottom: 15,
  },
  errorContainer: {
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#721c24",
    fontSize: 14,
  },
  inputWithIcon: {
    position: "relative",
    marginBottom: 15,
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: 15,
    color: "#999",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingLeft: 40,
    backgroundColor: "#f8f9fa",
    fontSize: 16,
  },
  signUpButton: {
    flexDirection: "row",
    backgroundColor: "#3a1c71",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    marginLeft: 10,
  },
  loginText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  loginLink: {
    color: "#d76d77",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  modalErrorText: {
    color: "#721c24",
    fontSize: 14,
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: "#3a1c71",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    padding: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#d76d77",
    fontSize: 16,
  },
});

export default styles;
