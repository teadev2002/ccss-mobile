import React from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Feather } from "@expo/vector-icons";

const LoadingSpinner = ({ message = "Loading...", size = "large", color = "#22668a" }) => {
  const spinAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Feather name="loader" size={36} color={color} />
        </Animated.View>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  card: {
    backgroundColor: "#fefefe",
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  text: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
});

export default LoadingSpinner;
