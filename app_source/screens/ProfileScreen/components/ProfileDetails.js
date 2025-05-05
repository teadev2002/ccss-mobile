import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import styles from "../ProfileStyles";

const profile = {
  birthday: "01-01-2002",
  height: "175 cm",
  weight: "70 kg",
  email: "john.doe@example.com",
  phone: "+84 123 456 789",
  taskQuantity: 10,
};

const ProfileDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const details = [
    { icon: "calendar", text: profile.birthday },
    { icon: "user", text: profile.height },
    { icon: "user", text: profile.weight },
    { icon: "mail", text: profile.email },
    { icon: "phone", text: profile.phone },
    { icon: "activity", text: `${profile.taskQuantity} Tasks` },
  ];

  const visibleDetails = isExpanded ? details : details.slice(0, 1);

  return (
    <>
      <View style={styles.detailsGrid}>
        {visibleDetails.map((item, idx) => (
          <View key={idx} style={styles.detailItem}>
            <Feather name={item.icon} size={16} color="#080808" />
            <Text style={styles.detailText}>{item.text}</Text>
          </View>
        ))}
      </View>
      {details.length > 2 && (
        <Button
          mode="text"
          style={styles.seeMoreButton}
          labelStyle={styles.seeMoreText}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Less" : "More"}
        </Button>
      )}
    </>
  );
};

export default ProfileDetails;
