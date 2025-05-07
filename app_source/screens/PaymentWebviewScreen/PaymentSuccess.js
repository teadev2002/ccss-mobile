import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const PaymentSuccess = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#e0f7fa", "#ffffff"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Ionicons name="checkmark-circle" size={100} color="#4caf50" />
        </View>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.text}>Thank you for your trust. Your order is being processed.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: "MainDrawer" }] })}
          >
            <Text style={styles.buttonOutlineText}>Back to Home</Text>
          </TouchableOpacity>

        </View>
      </View>
    </LinearGradient>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    marginBottom: 30,
    backgroundColor: "#e8f5e9",
    padding: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonOutline: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#2e7d32",
    marginBottom: 15,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSolid: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: "#2e7d32",
    alignItems: "center",
  },
  buttonSolidText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
