import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
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
  const [selectedStatuses, setSelectedStatuses] = useState(TAB_FILTERS["MyRequest"]);
  const [sortOption, setSortOption] = useState("Normal");
  const [orderOption, setOrderOption] = useState("Descending");
  const [search, setSearch] = useState("");

  // Toggle status filter on/off
  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Render tab buttons
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

  // Render status filter buttons for the current tab
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

  // Depending on active tab, pick the data source
  const dataList = activeTab === "MyRequest" ? history : contracts;

  // Filter dataList by selectedStatuses and search
  const filteredList = dataList.filter(
    (item) =>
      selectedStatuses.includes(item.status) &&
      (item.name?.toLowerCase().includes(search.toLowerCase()) ||
       item.startDate?.toLowerCase().includes(search.toLowerCase()) ||
       item.endDate?.toLowerCase().includes(search.toLowerCase()) ||
       (item.description && item.description.toLowerCase().includes(search.toLowerCase())))
  );

  // Sort filteredList according to sortOption and orderOption
  const sortedList = [...filteredList].sort((a, b) => {
    let compare = 0;

    if (sortOption === "Normal") {
      // Sort by name alphabetically
      compare = (a.name || "").localeCompare(b.name || "");
    } else if (sortOption === "Deposit") {
      compare = (a.deposit || 0) - (b.deposit || 0);
    } else if (sortOption === "Price") {
      compare = (a.price || 0) - (b.price || 0);
    }

    if (orderOption === "Descending") {
      compare = -compare;
    }

    return compare;
  });

  // Handlers for buttons in MyContract tab
  const handlePayDeposit = (item) => {
    // TODO: gọi API thanh toán deposit
    console.log("Pay Deposit:", item.contractId || item.requestId);
  };

  const handlePayRemaining = (item) => {
    // TODO: gọi API thanh toán phần còn lại
    console.log("Pay Remaining:", item.contractId || item.requestId);
  };

  const handleSendFeedback = (item) => {
    navigation.navigate("FeedbackScreen", { contractData: item });
  };

  const handleCancelContract = (item) => {
    // TODO: gọi API hủy hợp đồng và refresh danh sách
    console.log("Cancel Contract:", item.contractId || item.requestId);
  };

  // Render each rental request or contract item card
  const renderRequest = ({ item }) => {
    const isContractTab = activeTab === "MyContract";

    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {item.name}
          <Text style={styles.status}> {item.status}</Text>
        </Text>
        <Text>💵 Price: {item.price?.toLocaleString()} VND</Text>
        <Text>💰 Deposit: {item.deposit?.toLocaleString()} VND</Text>
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
          <TouchableOpacity
            style={styles.detailBtn}
            onPress={() =>
              navigation.navigate("RentalRequestDetail", { rentalData: item })
            }
          >
            <Text style={styles.btnText}>👁️ Request Details</Text>
          </TouchableOpacity>
        </View>

        {/* Nút đặc biệt cho tab MyContract */}
        {isContractTab && (
          <View style={[styles.buttonRow, { marginTop: 10 }]}>
            {(item.status === "Created") && (
              <>
                <TouchableOpacity
                  style={styles.payBtn}
                  onPress={() => handlePayDeposit(item)}
                >
                  <Text style={styles.btnText}>💳 Pay Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => handleCancelContract(item)}
                >
                  <Text style={styles.btnText}>❌ Cancel Contract</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "Deposited" && (
              <>
                <TouchableOpacity
                  style={styles.payBtn}
                  onPress={() => handlePayRemaining(item)}
                >
                  <Text style={styles.btnText}>💳 Pay Remaining</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => handleCancelContract(item)}
                >
                  <Text style={styles.btnText}>❌ Cancel Contract</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "Completed" && (
              <TouchableOpacity
                style={styles.feedbackBtn}
                onPress={() => handleSendFeedback(item)}
              >
                <Text style={styles.btnText}>📝 Send Feedback</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Costume Rental Management</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search by name, date, or description..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Sort & Order Pickers */}
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

      {/* Tab buttons */}
      {renderFilterTabs()}

      {/* Status filters */}
      {renderStatusFilters()}

      {/* List */}
      <FlatList
        data={sortedList}
        keyExtractor={(item) => item.requestId || item.contractId || item.id?.toString()}
        renderItem={renderRequest}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </ScrollView>
  );
}
