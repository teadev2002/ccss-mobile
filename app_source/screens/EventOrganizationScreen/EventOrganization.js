import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./EventOrganizationStyles";

const EventOrganization = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/OIP.dzzgt55X2dFakNpTNtPoZQHaE8?rs=1&pid=ImgDetMain",
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
          <Text style={styles.headerTitle}>Event Organization</Text>
        </View>
      </ImageBackground>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Event Organization Screen</Text>
      </View>
    </View>
  );
};

export default EventOrganization;
