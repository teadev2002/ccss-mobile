import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import {
  Button,
  Text,
  Card,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderHero from "../../../components/common/HeaderHero";
import MyEventOrganizeService from "../../../apiServices/eventOrganizeService/MyEventOrganizeService";
import { AuthContext } from "../../../../assets/context/AuthContext";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event, contract } = route.params;
  const { user } = useContext(AuthContext);

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContractCharacters = async () => {
      try {
        const characters = await MyEventOrganizeService.getContractCharacters(
          contract.contractId
        );

        const initialFeedbacks = characters.map((char) => ({
          contractCharacterId: char.contractCharacterId,
          characterName: char.characterId, // fallback nếu không có tên nhân vật
          quantity: char.quantity,
          feedback: "",
          rating: 0,
        }));

        setFeedbacks(initialFeedbacks);
      } catch (error) {
        console.error("Failed to fetch contract characters", error);
        alert("Could not load characters. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractCharacters();
  }, []);

  const handleChangeFeedback = (index, key, value) => {
    const updated = [...feedbacks];
    updated[index][key] = value;
    setFeedbacks(updated);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formattedFeedbacks = feedbacks.map((item) => ({
        contractCharacterId: item.contractCharacterId,
        star: item.rating === 0 ? 5 : item.rating,
        description: item.feedback || "No comment.",
      }));

      console.log(
        "payload: ",
        user.id,
        contract.contractId,
        JSON.stringify(formattedFeedbacks, null, 2)
      );

      await MyEventOrganizeService.createFeedback(
        user?.id,
        contract.contractId,
        formattedFeedbacks
      );

      alert("Feedback sent successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error sending feedback:", error);
      alert("Error sending feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    const hasAnyRating = feedbacks.some((item) => item.rating > 0);
    if (!hasAnyRating) {
      setShowConfirmDialog(true);
    } else {
      handleFinalSubmit();
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 12 }}>Loading characters...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HeaderHero title="Feedback Cosplayer" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Card style={{ borderRadius: 12, elevation: 4, marginBottom: 20 }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <FontAwesome
                name="calendar"
                size={20}
                color="#333"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {event.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Feather
                name="map-pin"
                size={18}
                color="#555"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#666" }}>
                {event.location}
              </Text>
            </View>

            <Text style={{ marginBottom: 12 }}>
              Please share your feedback for each character.
            </Text>

            {feedbacks.length === 0 ? (
              <Text>No characters available for feedback.</Text>
            ) : (
              feedbacks.map((item, index) => (
                <View
                  key={item.contractCharacterId}
                  style={{ marginBottom: 24 }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginBottom: 6,
                    }}
                  >
                    {item.characterName} (x{item.quantity})
                  </Text>

                  <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesome
                        key={star}
                        name={star <= item.rating ? "star" : "star-o"}
                        size={24}
                        color="#f1c40f"
                        style={{ marginRight: 4 }}
                        onPress={() =>
                          handleChangeFeedback(index, "rating", star)
                        }
                      />
                    ))}
                  </View>

                  <TextInput
                    placeholder={`Feedback for ${item.characterName}...`}
                    value={item.feedback}
                    onChangeText={(text) =>
                      handleChangeFeedback(index, "feedback", text)
                    }
                    multiline
                    style={{
                      height: 100,
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#fff",
                      textAlignVertical: "top",
                    }}
                  />
                </View>
              ))
            )}
          </Card.Content>

          <Card.Actions style={{ justifyContent: "flex-end" }}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting || feedbacks.length === 0}
              style={{ borderRadius: 8 }}
            >
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      {/* Confirm Dialog */}
      <Portal>
        <Dialog
          visible={showConfirmDialog}
          onDismiss={() => setShowConfirmDialog(false)}
        >
          <Dialog.Icon icon="alert-circle-outline" />
          <Dialog.Title>Confirm sending Feedback</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              You haven't rated any characters. The system will auto-assign 5
              stars. Continue?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button onPress={handleFinalSubmit}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FeedbackScreen;
