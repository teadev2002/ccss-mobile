import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../EventRegistrationStyles";

const EventHeader = ({ navigation }) => {
  return (
    <View style={styles.headerBackground}>
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/R.3e5d12372d58e6496f9f84cada9e70b9?rik=w%2fsbUtrmip%2b7oA&pid=ImgRaw&r=0",
        }}
        style={styles.headerImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buy Ticket Event</Text>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("MyTicket")}>
            <Ionicons name="ticket-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EventHeader;
