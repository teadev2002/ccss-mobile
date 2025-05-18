import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, Chip, Button } from "react-native-paper";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/MyEventScreenStyle"
import { LinearGradient } from "expo-linear-gradient";
import EditEventModal from "./components/EditEventModal";
import EventDetailModal from "./components/EventDetailModal";

const TABS = [
  "Request Pending and Choose Deposit",
  "Payment Deposit Contract",
  "Remaining Payment",
  "Completed Contract",
];

const mockEvents = [
  {
    requestId: "REQ001",
    name: "Ultimate Character Rental",
    startDate: "23/05/2025",
    endDate: "23/05/2025",
    price: 3280000,
    location: "Daklak",
    status: "Pending",
    tab: 0,
  },
  {
    requestId: "REQ002",
    name: "Basic Character Rental",
    startDate: "23/05/2025",
    endDate: "25/05/2025",
    price: 760000,
    location: "Abc",
    status: "Pending",
    tab: 0,
  },
];

const MyEventScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [filters, setFilters] = useState({
    Pending: true,
    Browsed: true,
    Cancel: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  const filteredEvents = events.filter(
    (e) =>
      e.tab === activeTab &&
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filters[e.status]
  );

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.row}>
        <FontAwesome5 name="file-alt" size={20} color="#555" />
        <Text style={styles.eventTitle}>{item.name}</Text>
        <Chip style={styles.statusChip}>{item.status}</Chip>
      </View>

      <Text style={styles.eventText}>
        📅 {item.startDate} → {item.endDate}
      </Text>
      <Text style={styles.eventText}>
        💰 {item.price.toLocaleString()} VND
      </Text>
      <Text style={styles.eventText}>📍 {item.location}</Text>

      <View style={styles.actionRow}>
        <Button icon="pencil" mode="outlined" compact onPress={() => setEditVisible(true)}>
          Edit
        </Button>
        <Button icon="eye" mode="contained" compact onPress={() => setDetailVisible(true)}>
          View Details
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER BACK BUTTON */}
      <View style={styles.header}>
        <Button
          icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>

      {/* HERO SECTION */}
      <LinearGradient
        colors={["#510545", "#22668a", "#1a1a2e"]}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>My Event Organization</Text>
      </LinearGradient>

      {/* SEARCH */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search by name or date (DD/MM/YYYY)"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* TABS */}
      <View style={styles.tabContainer}>
        {TABS.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FILTER */}
      <View style={styles.filterRow}>
        {["Pending", "Browsed", "Cancel"].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() =>
              setFilters({ ...filters, [status]: !filters[status] })
            }
          >
            <Chip selected={filters[status]}>{status}</Chip>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.requestId}
          renderItem={renderEvent}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <EditEventModal visible={editVisible} onClose={() => setEditVisible(false)} />
      <EventDetailModal visible={detailVisible} onClose={() => setDetailVisible(false)} />
    </View>

    
  );
};

export default MyEventScreen;
