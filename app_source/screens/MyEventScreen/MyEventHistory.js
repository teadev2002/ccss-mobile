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
import EditEventModal from "./components/EditEventModal";
import EventDetailModal from "./components/EventDetailModal";
import useEventData from "../../hooks/useEventData";
import { AuthContext } from "../../../assets/context/AuthContext";
import PaymentService from "../../apiServices/paymentService/paymentService";
import PaymentPurpose from "../../const/PaymentPurpose";
import HeaderHero from "../../components/common/HeaderHero";

const TABS = [
  "Request Pending and Choose Deposit",
  "Payment Deposit Contract",
  "Remaining Payment",
  "Completed Contract",
];

const MyEventScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { events, loading, contracts } = useEventData(user?.id);
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

  const getDisplayStatus = (event, contracts) => {
    const eventStatus = event.status?.trim();
    if (eventStatus === "Cancel") {
      return { label: "Cancelled", color: "#d9534f" }; // đỏ
    }

    const contract = contracts.find((c) => c.requestId === event.requestId);
    const contractStatus = contract?.status?.trim();

    if (contractStatus === "Created") {
      return { label: "Waiting Deposit", color: "#f0ad4e" }; // vàng
    }
    if (contractStatus === "Deposited") {
      return { label: "Deposit Paid", color: "#5bc0de" }; // xanh dương nhạt
    }
    if (contractStatus === "Completed") {
      return { label: "Completed", color: "#5cb85c" }; // xanh lá
    }

    if (eventStatus === "Pending") {
      return { label: "Pending", color: "#0275d8" }; // xanh đậm
    }
    if (eventStatus === "Browsed") {
      return { label: "Browsed", color: "#6f42c1" }; // tím
    }

    return { label: "Unknown", color: "#999" };
  };

  const handleDeposit = async (method, contractId, event) => {
    const contract = contracts.find((c) => c.contractId === contractId);
    if (!contract) return alert("Không tìm thấy hợp đồng");

    const totalAmount = Number(event.price); // total của sự kiện cụ thể
    const depositRate = parseFloat(contract.deposit); // e.g. "30"

    if (isNaN(totalAmount) || isNaN(depositRate)) {
      return alert("Dữ liệu tổng tiền hoặc phần trăm cọc không hợp lệ");
    }

    const amount = (totalAmount * depositRate) / 100;

    const payload = {
      fullName: user.accountName,
      orderInfo: "",
      amount,
      purpose: PaymentPurpose.CONTRACT_DEPOSIT,
      accountId: user?.id,
      contractId: contract.contractId,
      isWeb: false,
    };

    try {
      const res = await PaymentService.DepositPayment(payload);
      if (res?.includes("http")) {
        navigation.navigate("PaymentWebviewScreen", { paymentUrl: res });
      } else {
        alert("Không nhận được link thanh toán.");
      }
    } catch (err) {
      alert("Thanh toán thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handlePayRemaining = async (amount, contractId) => {
    const payload = {
      fullName: user.accountName,
      orderInfo: "",
      amount: amount,
      purpose: PaymentPurpose.CONTRACT_SETTLEMENT,
      accountId: user?.id,
      ticketId: "",
      ticketQuantity: "",
      contractId: contractId,
      orderpaymentId: "",
      isWeb: false,
    };
    try {
      const res = await PaymentService.DepositPayment(payload);
      if (res?.includes("http")) {
        navigation.navigate("PaymentWebviewScreen", { paymentUrl: res });
      } else {
        alert("Không nhận được link thanh toán.");
      }
    } catch (err) {
      alert("Thanh toán thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const filteredEvents = events.filter((e) => {
    const status = e.status?.trim();
    const eventNameMatches = e.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const contract = contracts.find((c) => c.requestId === e.requestId);
    const contractStatus = contract?.status?.trim();

    switch (activeTab) {
      case 0:
        // Request Pending and Choose Deposit: dùng filter
        return !contract && filters[status] && eventNameMatches;

      case 1:
        // Payment Deposit Contract: contract tồn tại và status là Created
        return contract && contractStatus === "Created" && eventNameMatches;

      case 2:
        // Remaining Payment: contract status là Deposited
        return contract && contractStatus === "Deposited" && eventNameMatches;

      case 3:
        // Completed Contract: contract status là Completed
        return contract && contractStatus === "Completed" && eventNameMatches;

      default:
        return false;
    }
  });

  const renderEvent = ({ item }) => {
    const { label, color } = getDisplayStatus(item, contracts);
    return (
      <View style={styles.eventCard}>
        <View style={styles.row}>
          <FontAwesome5 name="file-alt" size={20} color="#555" />
          <Text style={styles.eventTitle}>{item.name}</Text>
          <Chip
            style={[styles.statusChip, { backgroundColor: color }]}
            textStyle={{ color: "#fff" }}
          >
            {label}
          </Chip>
        </View>

        <Text style={styles.eventText}>
          📅 {item.startDate} → {item.endDate}
        </Text>
        <Text style={styles.eventText}>
          💰 {item.price.toLocaleString()} VND
        </Text>
        <Text style={styles.eventText}>📍 {item.location}</Text>

        <View style={styles.actionRow}>
          {/* Không hiển thị gì nếu đã Cancel */}
          {item.status?.trim() !== "Cancel" &&
            (() => {
              const contract = contracts.find(
                (c) => c.requestId === item.requestId
              );
              const contractStatus = contract?.status?.trim();

              return (
                <>
                  {/* View Event Details: Luôn hiển thị nếu không bị Cancel */}
                  <Button
                    icon="eye"
                    mode="contained"
                    compact
                    onPress={() => {
                      setSelectedEvent(item);
                      setDetailVisible(true);
                    }}
                    style={styles.actionButton}
                  >
                    View Details
                  </Button>

                  {/* Nếu không có contract */}
                  {!contract && (
                    <Button
                      icon="pencil"
                      mode="outlined"
                      compact
                      onPress={() => {
                        setSelectedEvent(item);
                        setEditVisible(true);
                      }}
                      disabled={item.status?.trim() === "Browsed"}
                      style={[
                        styles.actionButton,
                        item.status?.trim() === "Browsed" && { opacity: 0.4 },
                      ]}
                    >
                      Edit
                    </Button>
                  )}

                  {/* Nếu có contract */}
                  {contract && (
                    <>
                      <Button
                        icon="file-document"
                        mode="outlined"
                        compact
                        onPress={() => {
                          if (contract?.urlPdf) {
                            navigation.navigate("ContractPdfScreen", {
                              url: contract.urlPdf,
                            });
                          } else {
                            alert("Contract not available.");
                          }
                        }}
                        style={styles.actionButton}
                      >
                        View Contract
                      </Button>

                      {(contractStatus === "Created" ||
                        contractStatus === "Deposited") && (
                        <Button
                          icon="cancel"
                          mode="outlined"
                          compact
                          onPress={() => {
                            // TODO: xử lý hủy hợp đồng
                            alert("Hủy hợp đồng: " + contract.contractId);
                          }}
                          style={styles.actionButton}
                        >
                          Cancel Contract
                        </Button>
                      )}

                      {contractStatus === "Created" && (
                        <Button
                          icon="credit-card"
                          mode="contained"
                          compact
                          onPress={() =>
                            handleDeposit("VNPay", contract.contractId, item)
                          }
                          style={styles.actionButton}
                        >
                          Pay Deposit
                        </Button>
                      )}

                      {contractStatus === "Deposited" && (
                        <Button
                          icon="credit-card"
                          mode="contained"
                          compact
                          onPress={() => {
                            handlePayRemaining(
                              contract.amount,
                              contract.contractId
                            );
                          }}
                          style={styles.actionButton}
                        >
                          Pay Remaining
                        </Button>
                      )}

                      {contractStatus === "Completed" && (
                        <Button
                          icon="message-text"
                          mode="contained"
                          compact
                          onPress={() => {
                            // TODO: mở modal feedback hoặc điều hướng đến màn hình feedback
                            navigation.navigate("FeedbackScreen", {
                              event: item,
                              contract: contract
                            });
                          }}
                          style={styles.actionButton}
                        >
                          Send Feedback
                        </Button>
                      )}
                    </>
                  )}
                </>
              );
            })()}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER BACK BUTTON */}
      <HeaderHero title="My Event Organization"/>

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
        {activeTab === 0 && (
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
        )}
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
