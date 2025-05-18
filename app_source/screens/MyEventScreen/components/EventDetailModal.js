import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Text, Button, List, Divider, Card } from "react-native-paper";
import styles from "../styles/EventDetailModalStyle";


const screenWidth = Dimensions.get("window").width;

const EventDetailModal = ({ visible, onClose }) => {
  const [expandedChar, setExpandedChar] = useState(true);

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎭 Event Details</Text>

        {/* SECTION 1: EVENT SUMMARY */}
        <Card style={styles.card}>
          <Card.Title title="Ultimate Character Rental" titleStyle={styles.cardTitle} />
          <Card.Content>
            <View style={styles.rowBetween}>
              <Text style={styles.statusBadge}>Pending</Text>
              <Text style={styles.label}>Total: 3,280,000 VND</Text>
            </View>

            <Text style={styles.infoText}>📍 Daklak</Text>
            <Text style={styles.infoText}>📦 Package: Advanced Cosplay Training (2,500,000 VND)</Text>
            <Text style={styles.infoText}>💰 Unit Hire Price: 24,000 – 42,000 VND</Text>
            <Text style={styles.infoText}>📅 23/05/2025 → 23/05/2025</Text>
            <Text style={styles.infoText}>🕒 Total Days: 1</Text>
            <Text style={styles.infoText}>💳 Deposit: 0%</Text>
          </Card.Content>
        </Card>

        {/* SECTION 2: CHARACTER DETAILS */}
        <Text style={styles.subHeader}>👥 Requested Characters</Text>

        <List.Accordion
          title="Character: Sasuke (Qty: 4)"
          expanded={expandedChar}
          onPress={() => setExpandedChar(!expandedChar)}
          titleStyle={styles.accordionTitle}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.infoText}>👤 Cosplayer: Not Assigned</Text>
              <Text style={styles.infoText}>📝 Description: shared</Text>
              <Text style={styles.infoText}>✅ Status: Accept</Text>
              <Text style={styles.infoText}>📏 Height: 165 – 185 cm</Text>
              <Text style={styles.infoText}>⚖️ Weight: 55 – 85 kg</Text>
              <Text style={styles.infoText}>💵 Unit Price: 120,000 VND/day</Text>

              <Image
                source={{ uri: "https://i.imgur.com/Y1Hl1rU.png" }}
                style={styles.image}
                resizeMode="cover"
              />

              <Divider style={{ marginVertical: 12 }} />

              <Text style={styles.timeLabel}>⏱ Time Slot</Text>
              <Text style={styles.infoText}>Start: 16:58 – 23/05/2025</Text>
              <Text style={styles.infoText}>End: 20:59 – 23/05/2025</Text>
              <Text style={styles.infoText}>⏳ Total Hours: 4.02</Text>
              <Text style={styles.infoText}>Status: Pending</Text>
            </Card.Content>
          </Card>
        </List.Accordion>

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
