import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../EventRegistrationStyles";

const EventItem = ({ item, navigation }) => {
  const handleDate = (startDate) => {
    const dateObj = new Date(startDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "ON READY";
      case 1:
        return "INACTIVE";
      case 2:
        return "ONGOING";
      case 3:
        return "ENDED";
      default:
        return "";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 0:
        return { backgroundColor: "#28a745" }; // Green
      case 1:
        return { backgroundColor: "#6c757d" }; // Grey
      case 2:
        return { backgroundColor: "#ffc107" }; // Yellow
      case 3:
        return { backgroundColor: "#dc3545" }; // Red
      default:
        return {};
    }
  };

  

  const { date, month, year } = handleDate(item.startDate);

  const isPastEvent = new Date(item.startDate) < new Date();

  const imageUrl =
    item.eventImageResponses?.[0]?.imageUrl ||
    "https://www.mmogames.com/wp-content/uploads/2018/05/blizzcon-cosplayer-army.jpg";

  const handleMoreButtonPress = () => {
    if (isPastEvent) return; // Nếu event expired thì không cho nhấn
    navigation.navigate("EventDetail", { eventId: item.eventId });
  };

  return (
    <View style={[styles.eventContainer, isPastEvent && { opacity: 0.5 }]}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.eventImage}
        imageStyle={{ borderRadius: 10 }}
        resizeMode="repeat"
      >
        <View style={styles.dateContainer}>
          <Text style={styles.dateMonth}>{handleDate(item.startDate)}</Text>
        </View>

        <View style={styles.eventDetails}>
          <Text style={styles.eventName}>{item.eventName}</Text>
        </View>

        <View style={styles.statusTagContainer}>
          <Text style={[styles.statusTag, getStatusStyle(item.status)]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={handleMoreButtonPress}
        >
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        {isPastEvent && (
          <View style={styles.expiredTag}>
            <Text style={styles.expiredText}>EXPIRED</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default EventItem;
