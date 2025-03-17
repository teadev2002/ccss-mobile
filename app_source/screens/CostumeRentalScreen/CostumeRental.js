import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CostumeRentalStyles";

const CostumeRental = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <ImageBackground
        source={{
          uri: "https://therecenttimes.com/wp-content/uploads/2021/02/top-10-1024x576.jpg",
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
          <Text style={styles.headerTitle}>Costume Rental</Text>
        </View>
      </ImageBackground>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Costume Rental Screen</Text>
      </View>
    </View>
  );
};

export default CostumeRental;
