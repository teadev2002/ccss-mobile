import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./EventRegistrationStyles";

const EventRegistration = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/R.3e5d12372d58e6496f9f84cada9e70b9?rik=w%2fsbUtrmip%2b7oA&pid=ImgRaw&r=0",
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
          <Text style={styles.headerTitle}>Event Registration</Text>
        </View>
      </ImageBackground>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Event Registration Screen</Text>
      </View>
    </View>
  );
};

export default EventRegistration;
