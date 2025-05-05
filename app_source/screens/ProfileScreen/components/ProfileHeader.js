import React from "react";
import { View } from "react-native";
import { Avatar, Button, Title, Text, Chip } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import styles from "../ProfileStyles";

const profile = {
  imageUrl: "https://cdn.pixabay.com/photo/2023/12/04/13/23/ai-generated-8429472_1280.png",
  name: "John Doe",
  description: "A passionate cosplayer and team leader.",
  isActive: true,
  onTask: true,
  leader: true,
};

const ProfileHeader = () => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
        <Avatar.Image size={150} source={{ uri: profile.imageUrl }} />
        <Button mode="contained" style={styles.editButton}>
          Edit Profile
        </Button>
      </View>

      <View style={styles.profileInfo}>
        <Title style={styles.name}>{profile.name}</Title>
        <Text style={styles.description}>{profile.description}</Text>
        <View style={styles.statusBadges}>
          {profile.isActive && (
            <Chip style={[styles.statusBadge, styles.activeBadge]}>Active</Chip>
          )}
          {profile.onTask && (
            <Chip style={[styles.statusBadge, styles.onTaskBadge]}>On Task</Chip>
          )}
          {profile.leader && (
            <Chip
              icon={() => <Feather name="award" size={14} color="#fff" />}
              style={[styles.statusBadge, styles.leaderBadge]}
            >
              Team Leader
            </Chip>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
