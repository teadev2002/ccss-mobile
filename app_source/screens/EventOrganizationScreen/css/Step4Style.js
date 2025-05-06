import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 16,
    },
    card: {
      backgroundColor: "#f9f9f9",
      padding: 16,
      borderRadius: 10,
      elevation: 2,
    },
    label: { fontWeight: "bold" },
    input: {
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      marginTop: 6,
      marginBottom: 10,
    },
    linkButton: { marginTop: 10 },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: "#888",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  export default styles;