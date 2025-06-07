import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import useEventData from "../../hooks/useCostumeData";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../assets/context/AuthContext";
import PaymentPurpose from "../../const/PaymentPurpose";
import PaymentService from "../../apiServices/paymentService/paymentService";
import MyRentalCostumeService from "../../apiServices/MyCostumeService/MyRentalCostumeService";
import DeliveryTimelinePopup from "./DeliveryTimelinePopup";
import RefundConfirmPopup from "./RefundConfirmPopup";
import CancelDetailPopup from "./components/CancelDetailPopup";
import styles from "./styles/RentalCostumeStyle";

const COLORS = {
  primary: "#4F46E5",
  secondary: "#6B7280",
  accent: "#10B981",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  error: "#EF4444",
  warning: "#FBBF24",
  success: "#10B981",
};

const TAB_FILTERS = {
  MyRequest: ["Pending", "Browsed", "Cancel"],
  MyContract: [
    "Cancel",
    "Created",
    "Deposited",
    "Completed",
    "Expired",
    "RefundOverdue",
    "Refund",
  ],
  MyRefund: ["Pending", "Paid", "Refund"],
};

const SORT_OPTIONS = ["Normal", "Deposit", "Price"];
const ORDER_OPTIONS = ["Ascending", "Descending"];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return { backgroundColor: COLORS.warning, color: "#000" };
    case "Browsed":
      return { backgroundColor: "#3B82F6", color: "#fff" };
    case "Cancel":
      return { backgroundColor: COLORS.error, color: "#fff" };
    case "Created":
      return { backgroundColor: "#8B5CF6", color: "#fff" };
    case "Deposited":
      return { backgroundColor: COLORS.success, color: "#fff" };
    case "Refund":
    case "RefundOverdue":
      return { backgroundColor: "#F97316", color: "#fff" };
    case "Completed":
      return { backgroundColor: COLORS.accent, color: "#fff" };
    case "Expired":
      return { backgroundColor: COLORS.secondary, color: "#fff" };
    case "Paid":
      return { backgroundColor: COLORS.primary, color: "#fff" };
    default:
      return { backgroundColor: "#E5E7EB", color: "#000" };
  }
};

export default function RentalCostumeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { history, contracts, loading, error, refresh } = useEventData(user?.id);

  const [activeTab, setActiveTab] = useState("MyRequest");
  const [selectedStatuses, setSelectedStatuses] = useState(TAB_FILTERS.MyRequest);
  const [sortOption, setSortOption] = useState("Normal");
  const [orderOption, setOrderOption] = useState("Descending");
  const [search, setSearch] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [refundPopupVisible, setRefundPopupVisible] = useState(false);
  const [cancelPopupVisible, setCancelPopupVisible] = useState(false);
  const [contractImages, setContractImages] = useState([]);
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [contractRefunds, setContractRefunds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Xử lý lỗi từ useEventData
  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
    }
  }, [error]);

  // Tải contractRefunds cho tab MyRefund
  useEffect(() => {
    if (activeTab === "MyRefund") {
      const fetchContractRefunds = async () => {
        try {
          const response = await MyRentalCostumeService.getAllContractRefunds();
          console.log("Contract refunds:", response);
          setContractRefunds(response || []);
        } catch (error) {
          console.error("Error fetching contract refunds:", error.message);
          alert("Failed to load refund data. Please try again.");
        }
      };
      fetchContractRefunds();
    }
  }, [activeTab]);

  // Xác định tab active dựa trên dữ liệu
  useEffect(() => {
    const dataList = history.length > 0 ? history : contracts;
    if (dataList.length > 0) {
      const newTab = determineActiveTab(dataList);
      setActiveTab(newTab);
      setSelectedStatuses(TAB_FILTERS[newTab]);
    }
  }, [history, contracts]);

  const determineActiveTab = (dataList) => {
    if (!dataList || dataList.length === 0) return "MyRequest";
    const firstStatus = dataList[0]?.status;
    for (const [tab, statuses] of Object.entries(TAB_FILTERS)) {
      if (statuses.includes(firstStatus)) return tab;
    }
    return "MyRequest";
  };

  // Hàm refresh khi vuốt xuống
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("Starting refresh for tab:", activeTab);
      await refresh();
      if (activeTab === "MyRefund") {
        const response = await MyRentalCostumeService.getAllContractRefunds();
        console.log("Contract refunds:", response);
        setContractRefunds(response || []);
      }
      console.log("Refresh completed");
    } catch (error) {
      console.error("Error refreshing data:", error.message);
      alert("Failed to refresh data. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const openContractPdf = (item) => {
    if (item?.urlPdf) {
      navigation.navigate("ContractPdfScreen", { url: item.urlPdf });
    } else {
      alert("Contract PDF is not available.");
    }
  };

  const handleDeposit = async (item) => {
    const payload = {
      fullName: user.accountName,
      orderInfo: "",
      amount: item.deposit,
      purpose: PaymentPurpose.CONTRACT_DEPOSIT,
      accountId: user?.id,
      ticketId: "",
      ticketQuantity: "",
      contractId: item.contractId,
      orderpaymentId: "",
      isWeb: false,
    };
    try {
      const res = await PaymentService.DepositPayment(payload);
      if (res?.includes("http")) {
        navigation.navigate("PaymentWebviewScreen", { paymentUrl: res });
      } else {
        alert("Payment link not received.");
      }
    } catch (err) {
      alert(`Payment failed: ${err.message || "Unknown error"}`);
    }
  };

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleViewDelivery = async (item) => {
    try {
      const result = await MyRentalCostumeService.getContractImg(item.contractId);
      setContractImages(result || []);
      setPopupVisible(true);
    } catch (error) {
      console.error("Error fetching delivery images:", error.message);
      alert("Failed to load delivery images.");
    }
  };

  const handleSendFeedback = (item) => {
    navigation.navigate("FeedbackScreen", { contractData: item });
  };

  const handleCancelContract = (item) => {
    setSelectedItem(item);
    setCancelPopupVisible(true);
  };

  const handleConfirmCancel = async ({ contractId, reason }) => {
    try {
      await MyRentalCostumeService.cancelContract(contractId, reason);
      alert("Contract cancelled successfully!");
      await refresh();
    } catch (error) {
      console.error("Error cancelling contract:", error.message);
      alert("Failed to cancel contract!");
    }
  };

  const handleRefundRequest = (item) => {
    setSelectedContractId(item.contractId);
    setRefundPopupVisible(true);
  };

  const handleRefundSuccess = async () => {
    setRefundPopupVisible(false);
    await refresh();
  };

  const dataList =
    activeTab === "MyRequest"
      ? history
      : activeTab === "MyContract"
      ? contracts
      : contractRefunds;

  const filteredList = dataList.filter(
    (item) =>
      selectedStatuses.includes(item.status) &&
      (item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.startDate?.toLowerCase().includes(search.toLowerCase()) ||
        item.endDate?.toLowerCase().includes(search.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(search.toLowerCase())))
  );

  const sortedList = [...filteredList].sort((a, b) => {
    let compare = 0;
    if (sortOption === "Normal") {
      compare = (a.name || a.contractId || "").localeCompare(
        b.name || b.contractId || ""
      );
    } else if (sortOption === "Deposit") {
      compare = (a.deposit || a.amount || 0) - (b.deposit || b.amount || 0);
    } else if (sortOption === "Price") {
      compare = (a.price || 0) - (b.price || 0);
    }
    if (orderOption === "Descending") compare = -compare;
    return compare;
  });

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
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
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
              selectedStatuses.includes(status) && styles.statusTextActive,
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRequest = ({ item }) => {
    const isContractTab = activeTab === "MyContract";
    const isRefundTab = activeTab === "MyRefund";

    return (
      <View style={styles.card}>
        <DeliveryTimelinePopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          contractImages={contractImages}
        />
        <RefundConfirmPopup
          visible={refundPopupVisible}
          onClose={() => setRefundPopupVisible(false)}
          contractId={selectedContractId}
          onSuccess={handleRefundSuccess}
        />
        <CancelDetailPopup
          visible={cancelPopupVisible}
          onClose={() => setCancelPopupVisible(false)}
          onConfirm={handleConfirmCancel}
          contractData={selectedItem}
        />
        {isRefundTab ? (
          <>
            <Text style={styles.cardTitle}>
              Refund #{item.contractRefundId}
            </Text>
            <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
              <Text style={styles.statusBadgeText}>{item.status}</Text>
            </View>
            <Text style={styles.cardText}>
              💵 Amount: {item.amount?.toLocaleString()} VND
            </Text>
            <Text style={styles.cardText}>
              💰 Damage Cost: {item.price?.toLocaleString()} VND
            </Text>
            <Text style={styles.cardText}>📅 Created: {item.createDate}</Text>
            <Text style={styles.cardText}>
              📅 Updated: {item.updateDate || "Not yet"}
            </Text>
            <Text style={styles.cardText}>📝 {item.description}</Text>
          </>
        ) : (
          <>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
              <Text style={styles.statusBadgeText}>{item.status}</Text>
            </View>
            <Text style={styles.cardText}>
              💵 Price: {item.price?.toLocaleString()} VND
            </Text>
            <Text style={styles.cardText}>
              💰 Deposit: {item.deposit?.toLocaleString()} VND
            </Text>
            <Text style={styles.cardText}>📅 Start Date: {item.startDate}</Text>
            <Text style={styles.cardText}>📅 Return Date: {item.endDate}</Text>
            <Text style={styles.cardText}>📍 Location: {item.location}</Text>
          </>
        )}

        <View style={styles.buttonRow}>
          {!isRefundTab && (
            <>
              {item.status === "Pending" && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate("EditRentalRequest", {
                      rentalData: item,
                      onSave: refresh,
                    })
                  }
                >
                  <Ionicons name="pencil" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("RentalRequestDetail", {
                    rentalData: item,
                  })
                }
              >
                <Ionicons
                  name="information-circle"
                  size={16}
                  color={COLORS.primary}
                />
                <Text style={styles.actionButtonText}>Detail</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {isContractTab && (
          <View style={[styles.buttonRow, { marginTop: 12 }]}>
            {item.status === "Created" && (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeposit(item)}
                >
                  <Ionicons name="card" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>Pay Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openContractPdf(item)}
                >
                  <Ionicons name="document" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>View PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleCancelContract(item)}
                >
                  <Ionicons name="close" size={16} color={COLORS.error} />
                  <Text
                    style={[styles.actionButtonText, { color: COLORS.error }]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "Deposited" && (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewDelivery(item)}
                >
                  <Ionicons name="car" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>View Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openContractPdf(item)}
                >
                  <Ionicons name="document" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>View PDF</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "Refund" && (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewDelivery(item)}
                >
                  <Ionicons name="car" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>View Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openContractPdf(item)}
                >
                  <Ionicons name="document" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>View PDF</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "Completed" && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleSendFeedback(item)}
              >
                <Ionicons name="chatbubble" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Send Feedback</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {isRefundTab && (
  <View style={[styles.buttonRow, { marginTop: 12 }]}>
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() =>
        navigation.navigate("RefundDetailScreen", { refundData: item })
      }
    >
      <Ionicons
        name="information-circle"
        size={16}
        color={COLORS.primary}
      />
      <Text style={styles.actionButtonText}>Refund Detail</Text>
    </TouchableOpacity>

    {item.status !== "Paid" && (
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() =>
          navigation.navigate("UpdateRefundScreen", { refundData: item })
        }
      >
        <Ionicons name="pencil" size={16} color={COLORS.primary} />
        <Text style={styles.actionButtonText}>Update Refund</Text>
      </TouchableOpacity>
    )}
  </View>
)}

      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <Text style={styles.header}>Costume Rental Management</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, date, or location"
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.sortRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortOption}
            onValueChange={(value) => setSortOption(value)}
            style={styles.picker}
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
            style={styles.picker}
          >
            {ORDER_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
      </View>

      {renderFilterTabs()}
      {renderStatusFilters()}

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : (
        <FlatList
          data={sortedList}
          keyExtractor={(item) =>
            item.requestId ||
            item.contractId ||
            item.contractRefundId ||
            item.id?.toString()
          }
          renderItem={renderRequest}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ScrollView>
  );
}