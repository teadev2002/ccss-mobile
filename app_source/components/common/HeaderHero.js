// src/components/HeaderHero.js

import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const HeaderHero = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Back Button */}
      {showBackButton && (
        <View style={{ padding: 0, position: "absolute", top: 40, left: 10, zIndex: 10 }}>
          <Button
            icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
            onPress={() => navigation.goBack()}
            compact
            style={{ backgroundColor: "transparent" }}
          />
        </View>
      )}

      {/* Hero Section */}
      <LinearGradient
        colors={["#510545", "#22668a", "#1a1a2e"]}
        style={{
          paddingVertical: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>{title}</Text>
      </LinearGradient>
    </>
  );
};

export default HeaderHero;
