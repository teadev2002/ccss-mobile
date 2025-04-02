// import React from "react";
// import { View, ScrollView, Linking } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Card, Title, Button, Text } from "react-native-paper";

// const MyTicket = () => {
//   return (
//     <View>
//       <Text>My Ticket</Text>
//     </View>
//   );
// };
// export default MyTicket;
import React from "react";
import { View, ScrollView, Linking, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button, Text, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

// Dữ liệu mẫu (có thể thay bằng API sau này)
const ticketHistory = [
  {
    id: "1",
    eventName: "Cosplay Festival 2025",
    date: "15/04/2025",
    time: "14:00 - 18:00",
    location: "Hội trường TP.HCM",
    status: "Đã sử dụng",
    ticketCode: "TICKET12345",
  },
  {
    id: "2",
    eventName: "Anime Expo 2025",
    date: "20/05/2025",
    time: "10:00 - 16:00",
    location: "Nhà văn hóa Thanh Niên",
    status: "Chưa sử dụng",
    ticketCode: "TICKET67890",
  },
];

const MyTicket = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#ffafbd", "#ffc3a0"]}
      style={styles.gradientContainer}
    >
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={25}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Title style={styles.headerTitle}>Ticket History</Title>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {ticketHistory.length > 0 ? (
          ticketHistory.map((ticket) => (
            <Card key={ticket.id} style={styles.card}>
              <Card.Content>
                <Title style={styles.eventName}>{ticket.eventName}</Title>
                <Paragraph style={styles.detailText}>
                  <Ionicons
                    name="calendar-clear-outline"
                    size={16}
                    color="#555"
                  />{" "}
                  {ticket.date} | {ticket.time}
                </Paragraph>
                <Paragraph style={styles.detailText}>
                  <Ionicons name="location-outline" size={18} color="#555" />{" "}
                  {ticket.location}
                </Paragraph>
                <Paragraph style={styles.detailText}>
                  <Ionicons name="ticket-outline" size={18} color="black" />
                  Mã vé: {ticket.ticketCode}
                </Paragraph>
                <Text
                  style={[
                    styles.status,
                    ticket.status === "Đã sử dụng"
                      ? styles.usedStatus
                      : styles.activeStatus,
                  ]}
                >
                  {ticket.status}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="outlined"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    )
                  }
                  style={styles.button}
                >
                  Xem chi tiết
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text style={styles.noTicketText}>
            Bạn chưa có lịch sử mua vé nào!
          </Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  usedStatus: {
    color: "#888",
  },
  activeStatus: {
    color: "#00cc00",
  },
  button: {
    marginTop: 8,
  },
  noTicketText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
  },
});

export default MyTicket;
