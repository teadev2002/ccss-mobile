import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../css/FeedbackStyles";

const ViewFeedbackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { character, cosplayer, feedback } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <LinearGradient colors={["#510545", "#22668a"]} style={styles.header}>
        <Button
          style={styles.backButton}
          icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>View Feedback</Text>
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>🎭 {cosplayer?.name}</Text>
        <Text style={styles.feedbackSubtitle}>Character: {character?.characterName}</Text>

          {/* Rating */}
          <Text style={styles.feedbackLabel}>⭐ Your Rating:</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <MaterialIcons
                key={star}
                name={star <= (feedback?.rating || 0) ? "star" : "star-border"}
                size={40}
                color={star <= (feedback?.rating || 0) ? "#f7b731" : "#ccc"}
                style={{ marginHorizontal: 6 }}
              />
            ))}
          </View>

          {/* Comment */}
          <Text style={styles.feedbackLabel}>📝 Your Comment:</Text>
          <View style={styles.feedbackCommentBox}>
            <Text style={styles.feedbackCommentText}>
              {feedback?.comment || "No comment provided."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewFeedbackScreen;
