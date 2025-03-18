// import React from "react";
// import { View, Text } from "react-native";

// const Profile = () => {
//   return (
//     <View>
//       <Text>Profile</Text>
//     </View>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Card, Title, Text, Button, Chip, Avatar } from "react-native-paper";
import styles from "./ProfileStyles";

const Profile = () => {
  const navigation = useNavigation();

  // Dữ liệu mẫu
  const profile = {
    imageUrl:
      "https://cdn.pixabay.com/photo/2023/12/04/13/23/ai-generated-8429472_1280.png",
    name: "John Doe",
    description: "A passionate cosplayer and team leader.",
    isActive: true,
    onTask: true,
    leader: true,
    email: "john.doe@example.com",
    phone: "+84 123 456 789",
    birthday: "01-01-2002",
    taskQuantity: 10,
    height: "175 cm",
    weight: "70 kg",
  };

  // State để kiểm soát hiển thị See More/Less
  const [isExpanded, setIsExpanded] = useState(false);

  // Danh sách chi tiết để dễ dàng quản lý
  const details = [
    {
      icon: "calendar",
      label: profile.birthday || "N/A",
      text: profile.birthday || "N/A",
    },
    {
      icon: "user",
      label: profile.height || "N/A",
      text: profile.height || "N/A",
    },
    {
      icon: "user",
      label: profile.weight || "N/A",
      text: profile.weight || "N/A",
    },
    {
      icon: "mail",
      label: profile.email,
      text: profile.email,
    },
    {
      icon: "phone",
      label: profile.phone || "N/A",
      text: profile.phone || "N/A",
    },

    {
      icon: "activity",
      label: `${profile.taskQuantity || 0} Tasks`,
      text: `${profile.taskQuantity || 0} Tasks`,
    },
  ];

  // Hiển thị 2 mục mặc định, mở rộng khi isExpanded là true
  const visibleDetails = isExpanded ? details : details.slice(0, 1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          style={styles.backButton}
          icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>PROFILE</Text>
      </View>

      {/* Profile Content */}
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Avatar.Image
              size={150}
              source={{ uri: profile.imageUrl }}
              style={styles.profileImage}
            />
            <Button
              mode="contained"
              style={styles.editButton}
              labelStyle={styles.editButtonText}
            >
              Edit Profile
            </Button>
          </View>

          <View style={styles.profileInfo}>
            <Title style={styles.name}>{profile.name}</Title>
            <Text style={styles.description}>
              {profile.description || "N/A"}
            </Text>

            {/* Status Badges */}
            <View style={styles.statusBadges}>
              {profile.isActive && (
                <Chip
                  style={[styles.statusBadge, styles.activeBadge]}
                  textStyle={styles.badgeText}
                >
                  Active
                </Chip>
              )}
              {profile.onTask && (
                <Chip
                  style={[styles.statusBadge, styles.onTaskBadge]}
                  textStyle={styles.badgeText}
                >
                  On Task
                </Chip>
              )}
              {profile.leader && (
                <Chip
                  style={[styles.statusBadge, styles.leaderBadge]}
                  textStyle={styles.badgeText}
                  icon={() => <Feather name="award" size={14} color="#fff" />}
                >
                  Team Leader
                </Chip>
              )}
            </View>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              {visibleDetails.map((detail, index) => (
                <View key={index} style={styles.detailItem}>
                  <Feather name={detail.icon} size={16} color="#080808" />
                  <Text style={styles.detailText}>{detail.text}</Text>
                </View>
              ))}
            </View>

            {/* See More/Less Button */}
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
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Button
            mode="text"
            style={styles.tab}
            labelStyle={[styles.tabText, styles.activeTab]}
            icon={() => <Feather name="grid" size={12} color="#080808" />}
          >
            Posts
          </Button>
        </View>

        {/* Empty State */}
        <Card style={styles.emptyState}>
          <Card.Content style={styles.emptyStateContent}>
            <View style={styles.cameraIcon}>
              <Feather name="camera" size={24} color="#080808" />
            </View>
            <Title style={styles.emptyStateTitle}>Share Photos</Title>
            <Text style={styles.emptyStateText}>
              When you share photos, they will appear on your profile.
            </Text>
            <Button
              mode="text"
              labelStyle={styles.shareButton}
              onPress={() => {}}
            >
              Share your first photo
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default Profile;
