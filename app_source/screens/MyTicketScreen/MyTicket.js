import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button, Text, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import PurchaseHistoryService from "../../apiServices/orderService/PurcharseHistoryService";
import { AuthContext } from "../../../assets/context/AuthContext";
import Modal from "react-native-modal";
import styles from "./styles/MyTicketStyle";

const MyTicket = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeight, setModalHeight] = useState("50%");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const accountId = user?.id;
      const response = await PurchaseHistoryService.getAllTicketsByAccountId(accountId);
      setTickets(response);
    } catch (error) {
      Alert.alert("Error", "Failed to load ticket history: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTicket(null);
  };

  const getTicketTypeLabel = (type) => {
    switch (type) {
      case 0:
        return "Regular";
      case 1:
        return "VIP";
      default:
        return "Unknown";
    }
  };

  const getTicketTypeColor = (type) => {
    switch (type) {
      case 0:
        return "#4dabf7"; // blue Regular
      case 1:
        return "#ffc107"; // yellow VIP
      default:
        return "#6c757d"; // grey unknown
    }
  };

  const getStatusIcon = (status) => {
    return status === 0 ? (
      <Ionicons name="checkmark-circle" size={18} color="#28a745" />
    ) : (
      <Ionicons name="close-circle" size={18} color="#dc3545" />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={25}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Title style={styles.headerTitle}>My Tickets</Title>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {tickets.length > 0 ? (
            tickets.map((item) => (
              <Card key={item.ticketAccountId} style={styles.card}>
                <Card.Content>
                  <Title style={styles.eventName}>
                    {item.ticket?.event?.eventName || "Unknown Event"}
                  </Title>

                  <Paragraph style={styles.detailText}>
                    <Ionicons name="calendar-clear-outline" size={16} color="#555" />{" "}
                    {item.ticket?.event?.startDate ? formatDate(item.ticket.event.startDate) : "?"}
                  </Paragraph>

                  <Paragraph style={styles.detailText}>
                    <Ionicons name="location-outline" size={16} color="#555" />{" "}
                    {item.ticket?.event?.location || "Unknown Location"}
                  </Paragraph>

                  <Paragraph style={styles.detailText}>
                    <Ionicons name="ticket-outline" size={16} color="black" />{" "}
                    Ticket Code: {item.ticketCode}
                  </Paragraph>

                  <View style={styles.inlineRow}>
                    {getStatusIcon(item.ticket?.ticketStatus)}
                    <Text
                      style={[
                        styles.status,
                        item.ticket.ticketStatus === 0
                          ? styles.activeStatus
                          : styles.usedStatus,
                      ]}
                    >
                      {item.ticket.ticketStatus === 0 ? "Not used yet" : "Used"}
                    </Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="outlined"
                    onPress={() => openModal(item)}
                    style={styles.button}
                  >
                    View Details
                  </Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text style={styles.noTicketText}>You don't have any tickets yet!</Text>
          )}
        </ScrollView>
      )}

      <Modal
        isVisible={modalVisible}
        onSwipeComplete={closeModal}
        swipeDirection={["down"]}
        onBackdropPress={closeModal}
        style={styles.modalStyle}
        
      >
        <View style={[styles.modalContent, { height: "75%" }]}>
          {selectedTicket && (
            <>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLine} />
                <Title style={styles.modalEventName}>
                  {selectedTicket.ticket?.event?.eventName}
                </Title>
              </View>

              <ScrollView style={styles.modalBody}>
                <View style={styles.modalRow}>
                  <Ionicons name="calendar-clear-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Date:</Text>
                  <Text style={styles.modalValue}>{formatDate(selectedTicket.ticket?.event?.startDate)}</Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="time-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Time:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.ticket?.event?.startDate ? formatDate(selectedTicket.ticket.event.startDate) : "?"}
                    {" "} - {" "}
                    {selectedTicket.ticket?.event?.endDate ? formatDate(selectedTicket.ticket.event.endDate) : "?"}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="location-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Location:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.ticket?.event?.location || "Unknown"}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="ticket-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Ticket Code:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.ticketCode}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="pricetags-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Ticket Type:</Text>
                  <Text style={[styles.modalValue, { color: getTicketTypeColor(selectedTicket.ticket.ticketType) }]}>
                    {getTicketTypeLabel(selectedTicket.ticket.ticketType)}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="people-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Quantity:</Text>
                  <Text style={styles.modalValue}>{selectedTicket.quantity}</Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="cash-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Total Price:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.totalPrice.toLocaleString()} VNĐ
                  </Text>
                </View>

                <View style={[styles.modalRow, { alignItems: "flex-start" }]}>
                  <Ionicons name="document-text-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Description:</Text>
                </View>
                <Text style={styles.modalDescription}>
                  {selectedTicket.ticket?.description || "No description"}
                </Text>

                <View style={styles.modalRow}>
                  <Ionicons name="person-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Created by:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.ticket?.event?.createBy || "Unknown"}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Ionicons name="calendar-outline" size={18} color="#6c63ff" />
                  <Text style={styles.modalLabel}>Created Date:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.ticket?.event?.createDate ? formatDate(selectedTicket.ticket.event.createDate) : "?"}
                  </Text>
                </View>

                {selectedTicket.ticket?.event?.updateDate && (
                  <View style={styles.modalRow}>
                    <Ionicons name="sync-outline" size={18} color="#6c63ff" />
                    <Text style={styles.modalLabel}>Updated Date:</Text>
                    <Text style={styles.modalValue}>
                      {formatDate(selectedTicket.ticket.event.updateDate)}
                    </Text>
                  </View>
                )}
              </ScrollView>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default MyTicket;
