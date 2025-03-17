import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SouvenirsStyles";

const Souvenirs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <ImageBackground
        source={{
          uri: "https://nintendoeverything.com/wp-content/uploads/Pokemon-Center-7/9/16/pokemon-center-7.jpg",
        }}
        style={styles.headerBackground}
      >
        {/* Lớp phủ mờ */}
        <View style={styles.overlay} />

        {/* Nội dung header */}
        <View style={styles.headerContent}>
          {/* Nút quay lại */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.headerTitle}>Souvenirs</Text>
        </View>
      </ImageBackground>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Souvenirs Screen</Text>
      </View>
    </View>
  );
};

export default Souvenirs;
