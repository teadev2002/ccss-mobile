import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../../assets/img/CCSSlogo.png";

export default function Onboarding() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer); // Dọn dẹp timer
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#510545", "#22668a"]} // Gradient từ #510545 đến #22668a
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.textAccent}>
          Cosplay Companion Service System {"\n"} {"\n"}
        </Text>
        <Image source={Logo} style={styles.logo} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
  },
  textAccent: {
    textAlign: "center",
    fontSize: 34,
    color: "#ffaf7b",
    fontWeight: "bold",
  },
});
