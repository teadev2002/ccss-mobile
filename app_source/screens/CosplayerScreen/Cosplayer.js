import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CosplayerStyles";

const Cosplayer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/R.32ada2b20a764c07f62d8405b21c1ae7?rik=QbEtGn4nfD654Q&pid=ImgRaw&r=0",
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
          <Text style={styles.headerTitle}>Cosplayer</Text>
        </View>
      </ImageBackground>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Cosplayer Screen</Text>
      </View>
    </View>
  );
};

export default Cosplayer;
