import React, { useState } from "react";
import { View, TextInput, ScrollView, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../css/FeedbackStyles";
import hireHistoryService from "../../../apiServices/hireHistoryService/hireHistoryService";

const FeedbackCosplayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cosplayersList, contractId, accountId, isViewMode } = route.params;

  const [feedbacks, setFeedbacks] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (cosplayerId, rating) => {
    setFeedbacks((prev) => ({
      ...prev,
      [cosplayerId]: {
        ...prev[cosplayerId],
        star: rating,
      },
    }));
  };

  const handleCommentChange = (cosplayerId, comment) => {
    setFeedbacks((prev) => ({
      ...prev,
      [cosplayerId]: {
        ...prev[cosplayerId],
        description: comment,
      },
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const incomplete = cosplayersList.some((cos) => {
      const f = feedbacks[cos.cosplayerId] || {};
      return !f.star || f.description?.trim() === "";
    });

    const proceed = async () => {
      try {
        setIsSubmitting(true);

        const feedbackData = cosplayersList.map((cos) => {
          const f = feedbacks[cos.cosplayerId] || {};
          return {
            contractCharacterId: cos.contractCharacterId,
            star: f.star || 5,
            description: f.description?.trim() || "",
          };
        });

        const payload = { feedbacks: feedbackData };

        await hireHistoryService.createFeedback(accountId, contractId, payload);

        Alert.alert("Success", "Thank you for your feedback!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } catch (error) {
        console.error("Feedback error:", error);
        Alert.alert("Error", "Failed to submit feedback.");
      } finally {
        setIsSubmitting(false);
      }
    };

    if (incomplete) {
      Alert.alert(
        "Incomplete Feedback",
        "Some feedbacks are missing rating or comment. The system will automatically rate 5 stars with comment 'Good'. Continue?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes, Submit", onPress: proceed },
        ]
      );
    } else {
      proceed();
    }
  };

  const handleBack = () => {
    if (isViewMode) {
      navigation.goBack(); 
      return;
    }
  
    Alert.alert(
      "Unsaved Feedback",
      "Are you sure you want to leave without submitting?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <LinearGradient colors={["#510545", "#22668a"]} style={styles.header}>
        <Button
          style={styles.backButton}
          icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
          onPress={handleBack}
        />
        <Text style={styles.headerTitle}>Feedback Cosplayers</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cosplayersList.map((cos, index) => (
          <View key={cos.cosplayerId || index} style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>🎭 {cos.cosplayerName}</Text>
            <Text style={styles.feedbackSubtitle}>
              Character: {cos.characterName}
            </Text>

            <Text style={styles.feedbackLabel}>
              ⭐ {isViewMode ? "Your Rating:" : "Rate:"}
            </Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <MaterialIcons
                  key={star}
                  name={
                    star <=
                    (isViewMode
                      ? cos.star
                      : feedbacks[cos.cosplayerId]?.star || 0)
                      ? "star"
                      : "star-border"
                  }
                  size={40}
                  color={
                    star <=
                    (isViewMode
                      ? cos.star
                      : feedbacks[cos.cosplayerId]?.star || 0)
                      ? "#f7b731"
                      : "#ccc"
                  }
                  style={{ marginHorizontal: 6 }}
                  onPress={
                    isViewMode
                      ? undefined
                      : () => handleRatingChange(cos.cosplayerId, star)
                  }
                />
              ))}
            </View>

            <Text style={styles.feedbackLabel}>
              ✍️ {isViewMode ? "Comment:" : "Your Comment:"}
            </Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Write your feedback..."
              multiline
              maxLength={300}
              value={
                isViewMode
                  ? cos.description || "No comment."
                  : feedbacks[cos.cosplayerId]?.description || ""
              }
              onChangeText={
                isViewMode
                  ? undefined
                  : (text) => handleCommentChange(cos.cosplayerId, text)
              }
              editable={!isViewMode && !isSubmitting}
            />
            {!isViewMode && (
              <Text style={{ textAlign: "right", color: "#666", fontSize: 12 }}>
                {(feedbacks[cos.cosplayerId]?.description || "").length}/300
                characters
              </Text>
            )}
          </View>
        ))}

        {!isViewMode && (
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        )}
      </ScrollView>
    </View>
  );
};

export default FeedbackCosplayerScreen;
