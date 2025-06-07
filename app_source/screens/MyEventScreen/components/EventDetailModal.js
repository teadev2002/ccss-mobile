import React, { useState, useEffect } from "react";
import { View, Modal, ScrollView, Image } from "react-native";
import { Text, Button, List, Divider, Card } from "react-native-paper";
import styles from "../styles/EventDetailModalStyle";
import MyEventOrganizeService from "../../../apiServices/eventOrganizeService/MyEventOrganizeService";

const EventDetailModal = ({ visible, onClose, event }) => {
  const [expandedChar, setExpandedChar] = useState(true);
  const [cosplayerDetails, setCosplayerDetails] = useState({});

  useEffect(() => {
    if (!event || !event.charactersListResponse) return;

    const fetchCosplayerDetails = async () => {
      const details = {};

      for (const char of event.charactersListResponse) {
        if (char.cosplayerId) {
          try {
            const response =
              await MyEventOrganizeService.getNameCosplayerInRequestByCosplayerId(
                char.cosplayerId
              );
            details[char.cosplayerId] = {
              name: response.name || "Unknown",
              description: response.description || "No description",
              status: response.isActive ? "Active" : "Inactive",
            };
          } catch (error) {
            console.error("Error fetching cosplayer details:", error);
            details[char.cosplayerId] = {
              name: "Unknown",
              description: "Error loading description",
              status: "Unknown",
            };
          }
        }
      }

      setCosplayerDetails(details);
    };

    fetchCosplayerDetails();
  }, [event]);

  if (!event) return null;

  console.log("Event", JSON.stringify(event, null, 2));

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎭 Event Details</Text>

        {/* SECTION 1: EVENT SUMMARY */}
        <Card style={styles.card}>
          <Card.Title title={event.name} titleStyle={styles.cardTitle} />
          <Card.Content>
            <View style={styles.rowBetween}>
              <Text style={styles.statusBadge}>{event.status}</Text>
              <Text style={styles.label}>
                Total: {Number(event.price).toLocaleString()} VND
              </Text>
            </View>

            <Text style={styles.infoText}>📍 {event.location}</Text>
            <Text style={styles.infoText}>
              💰 Unit Hire Price: {event.range}
            </Text>
            <Text style={styles.infoText}>
              📅 {event.startDate} → {event.endDate}
            </Text>
            <Text style={styles.infoText}>
              🕒 Total Days: {event.totalDate}
            </Text>
            <Text style={styles.infoText}>💳 Deposit: {event.deposit}%</Text>
          </Card.Content>
        </Card>

        {/* SECTION 2: CHARACTER DETAILS */}
        <Text style={styles.subHeader}>👥 Requested Characters</Text>

        {event?.charactersListResponse?.map((charDetail, idx) => (
          <List.Accordion
            key={idx}
            title={`Character: ${charDetail.characterName} (Qty: ${charDetail.quantity})`}
            expanded={expandedChar}
            onPress={() => setExpandedChar(!expandedChar)}
            titleStyle={styles.accordionTitle}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.infoText}>
                  👤 Cosplayer:{" "}
                  {charDetail.cosplayerId
                    ? cosplayerDetails[charDetail.cosplayerId]?.name ||
                      "Loading..."
                    : "Not Assigned"}
                </Text>
                <Text style={styles.infoText}>
                  📝 Description:{" "}
                  {charDetail.cosplayerId
                    ? cosplayerDetails[charDetail.cosplayerId]?.description ||
                      "No description"
                    : charDetail.description}
                </Text>
                <Text style={styles.infoText}>
                  ✅ Status:{" "}
                  {charDetail.cosplayerId
                    ? cosplayerDetails[charDetail.cosplayerId]?.status ||
                      "Unknown"
                    : charDetail.status}
                </Text>
                <Text style={styles.infoText}>
                  📏 Height: {charDetail.minHeight} – {charDetail.maxHeight} cm
                </Text>
                <Text style={styles.infoText}>
                  ⚖️ Weight: {charDetail.minWeight} – {charDetail.maxWeight} kg
                </Text>

                {charDetail.characterImages?.length > 0 && (
                  <Image
                    source={{ uri: charDetail.characterImages[0].urlImage }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}

                <Divider style={{ marginVertical: 12 }} />

                <Text style={styles.timeLabel}>⏱ Time Slot</Text>
                {charDetail.requestDateResponses?.length > 0 && (
                  <>
                    <Text style={styles.infoText}>
                      Start: {charDetail.requestDateResponses[0].startDate}
                    </Text>
                    <Text style={styles.infoText}>
                      End: {charDetail.requestDateResponses[0].endDate}
                    </Text>
                    <Text style={styles.infoText}>
                      ⏳ Total Hours:{" "}
                      {charDetail.requestDateResponses[0].totalHour}
                    </Text>
                  </>
                )}
              </Card.Content>
            </Card>
          </List.Accordion>
        ))}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Button mode="outlined" onPress={onClose} style={styles.footerBtn}>
            Cancel
          </Button>
          <Button mode="contained" onPress={onClose} style={styles.footerBtn}>
            Close
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EventDetailModal;
