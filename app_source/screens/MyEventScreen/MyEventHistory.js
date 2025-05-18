import React, { useState, useContext } from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, Chip, Button } from "react-native-paper";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/MyEventScreenStyle";
import { LinearGradient } from "expo-linear-gradient";
import EditEventModal from "./components/EditEventModal";
import EventDetailModal from "./components/EventDetailModal";
import useEventData from "../../hooks/useEventData";
import { AuthContext } from "../../../assets/context/AuthContext";

const TABS = [
  "Request Pending and Choose Deposit",
  "Payment Deposit Contract",
  "Remaining Payment",
  "Completed Contract",
];

const MyEventScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { events, loading } = useEventData(user?.id);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    Pending: true,
    Browsed: true,
    Cancel: true,
  });

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
      <Text style={styles.eventText}>💰 {item.price.toLocaleString()} VND</Text>
      <Text style={styles.eventText}>📍 {item.location}</Text>

      <View style={styles.actionRow}>
        <Button
          icon="pencil"
          mode="outlined"
          compact
          onPress={() => {
            setSelectedEvent(item);
            setEditVisible(true);
          }}
        >
          Edit
        </Button>
        <Button
          icon="eye"
          mode="contained"
          compact
          onPress={() => {
            setSelectedEvent(item);
            setEditVisible(true);
          }}
        >
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

      <EditEventModal
        visible={editVisible}
        onClose={() => {
          setEditVisible(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
      <EventDetailModal
        visible={detailVisible}
        onClose={() => {
          setDetailVisible(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </View>
  );
};

export default MyEventScreen;
