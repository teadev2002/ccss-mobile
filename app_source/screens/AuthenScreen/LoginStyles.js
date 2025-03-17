import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    // flexGrow: 1,
    // justifyContent: "center",
    // padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  leftPanel: {
    position: "absolute",
    top: 38,
    left: 20,
    padding: 20,
    zIndex: 1, // Đảm bảo leftPanel luôn ở trên cùng
  },
  panelTitle: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    lineHeight: 36, // Điều chỉnh khoảng cách dòng cho phù hợp
  },
  textAccent: {
    color: "#ffaf7b",
    fontWeight: "bold",
  },
  content: {
    width: "85%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    marginTop: 190, // Tăng marginTop để tránh đè lên leftPanel
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3a1c71",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#000",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4C6EF5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#000",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
  },
  signUpText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpLink: {
    color: "#4C6EF5",
    fontWeight: "bold",
  },
});

export default styles;
