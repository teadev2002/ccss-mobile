import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const PaymentFailed = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentContext } = route.params || {};

  const handleRetry = () => {
    if (paymentContext?.type === "hire") {
      navigation.reset({
        index: 1,
        routes: [
          { name: "MainDrawer" },
          { name: "HireHistory" },
        ],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainDrawer" }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❌</Text>
      <Text style={styles.title}>Payment Failed</Text>
      <Text style={styles.text}>
        Something went wrong during the payment process. Please try again.
      </Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleRetry}>
        <Text style={styles.buttonText}>
          {paymentContext?.type === "hire"
            ? "Go to Request History"
            : "Back to Home"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonOutlineText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFailed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff3f3",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#c62828",
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#555",
  },
  buttonPrimary: {
    backgroundColor: "#c62828",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOutline: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderColor: "#c62828",
    borderWidth: 2,
    borderRadius: 25,
  },
  buttonOutlineText: {
    color: "#c62828",
    fontSize: 16,
    fontWeight: "bold",
  },
});
