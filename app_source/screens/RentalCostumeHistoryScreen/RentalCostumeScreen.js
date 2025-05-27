import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import styles from "./styles/RentalCostumeStyle";
import { Picker } from "@react-native-picker/picker";
import useEventData from "../../hooks/useCostumeData";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../assets/context/AuthContext";

const TAB_FILTERS = {
  MyRequest: ["Pending", "Browsed", "Cancel"],
  MyContract: [
    "Cancel",
    "Created",
    "Deposited",
    "Refund",
    "Completed",
    "Expired",
    "RefundOverdue",
  ],
  MyRefund: ["Pending", "Paid"],
};

const SORT_OPTIONS = ["Normal", "Deposit", "Price"];
const ORDER_OPTIONS = ["Ascending", "Descending"];

export default function CostumeRentalScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { history, loading, contracts } = useEventData(user?.id);
  const [activeTab, setActiveTab] = useState("MyRequest");
  const [selectedStatuses, setSelectedStatuses] = useState(
    TAB_FILTERS["MyRequest"]
  );
  const [sortOption, setSortOption] = useState("Normal");
  const [orderOption, setOrderOption] = useState("Descending");
  const [search, setSearch] = useState("");

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const renderFilterTabs = () => (
    <View style={styles.tabRow}>
      {["MyRequest", "MyContract", "MyRefund"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabButton, activeTab === tab && styles.activeTab]}
          onPress={() => {
            setActiveTab(tab);
            setSelectedStatuses(TAB_FILTERS[tab]);
          }}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStatusFilters = () => (
    <View style={styles.statusFilters}>
      {TAB_FILTERS[activeTab].map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.statusBtn,
            selectedStatuses.includes(status) && styles.statusBtnActive,
          ]}
          onPress={() => handleStatusToggle(status)}
        >
          <Text
            style={[
              styles.statusText,
              selectedStatuses.includes(status) && { color: "#fff" },
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRequest = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.name}
        <Text style={styles.status}> {item.status}</Text>
      </Text>
      <Text>💵 Price: {item.price.toLocaleString()} VND</Text>
      <Text>💰 Deposit: {item.deposit.toLocaleString()} VND</Text>
      <Text>📅 Start Date: {item.startDate}</Text>
      <Text>📅 Return Date: {item.endDate}</Text>
      <Text>📍 Location: {item.location}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate("EditRentalRequest", { rentalData: item })
          }
        >
          <Text style={styles.btnText}>👁️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailBtn} onPress={() => navigation.navigate("RentalRequestDetail", { rentalData: item })}>
          <Text style={styles.btnText}>👁️ Request Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredList = history.filter(
    (item) =>
      selectedStatuses.includes(item.status) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Costume Rental Management</Text>

      {/* Search & Sort */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search by name, date, or description..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.sortRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={orderOption}
            onValueChange={(value) => setOrderOption(value)}
          >
            {ORDER_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
      </View>

      {renderFilterTabs()}
      {renderStatusFilters()}

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.requestId}
        renderItem={renderRequest}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </ScrollView>
  );
}
