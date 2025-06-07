import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { Chip, Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/MyEventScreenStyle";
import EditEventModal from "./components/EditEventModal";
import EventDetailModal from "./components/EventDetailModal";
import ChooseDepositModal from "./components/ChooseDepositModal";
import useEventData from "../../hooks/useEventData";
import { AuthContext } from "../../../assets/context/AuthContext";
import PaymentService from "../../apiServices/paymentService/paymentService";
import PaymentPurpose from "../../const/PaymentPurpose";
import HeaderHero from "../../components/common/HeaderHero";
import MyEventOrganizeService from "../../apiServices/eventOrganizeService/MyEventOrganizeService";

const TABS = [
  "Request Pending and Choose Deposit",
  "Payment Deposit Contract",
  "Remaining Payment",
  "Completed Contract",
];



const checkCanShowChooseDeposit = async (requestId) => {
  try {
    const repon = await MyEventOrganizeService.getRequestByRequestId(requestId);
    console.log("repon", JSON.stringify(repon, null , 2));
    
    return (
      repon.status === "Browsed" &&
      repon.charactersListResponse?.length > 0 &&
      repon.charactersListResponse.every((char) => char.cosplayerId != null)
    );
  } catch (error) {
    console.error("Error checking deposit condition:", error);
    return false; // Trả về false nếu API lỗi
  }
};

const MyEventScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { events, loading, contracts } = useEventData(user?.id);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [chooseDepositVisible, setChooseDepositVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [canShowChooseDeposit, setCanShowChooseDeposit] = useState({});
  const [filters, setFilters] = useState({
    Pending: true,
    Browsed: true,
    Cancel: true,
  });

  useEffect(() => {
    const checkDeposits = async () => {
      const results = {};
      for (const event of events) {
        if (event.status?.trim() === "Browsed") {
          results[event.requestId] = await checkCanShowChooseDeposit(event.requestId);
        }
      }
      setCanShowChooseDeposit(results);
    };
    checkDeposits();
  }, [events]);

  const getDisplayStatus = (event, contracts) => {
    const eventStatus = event.status?.trim();
    if (eventStatus === "Cancel") {
      return { label: "Cancelled", color: "#d9534f" };
    }

    const contract = contracts.find((c) => c.requestId === event.requestId);
    const contractStatus = contract?.status?.trim();

    if (contractStatus === "Created") {
      return { label: "Waiting Deposit", color: "#f0ad4e" };
    }
    if (contractStatus === "Deposited") {
      return { label: "Deposit Paid", color: "#5bc0de" };
    }
    if (contractStatus === "Completed") {
      return { label: "Completed", color: "#5cb85c" };
    }

    if (eventStatus === "Pending") {
      return { label: "Pending", color: "#0275d8" };
    }
    if (eventStatus === "Browsed") {
      return { label: "Browsed", color: "#6f42c1" };
    }

    return { label: "Unknown", color: "#999" };
  };

  const handleDeposit = async (method, contractId, event) => {
    const contract = contracts.find((c) => c.contractId === contractId);
    if (!contract) return alert("Không tìm thấy hợp đồng");

    const totalAmount = Number(event.price);
    const depositRate = parseFloat(contract.deposit);

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

  const handleChooseDeposit = async (percentage) => {
  if (!percentage) return alert("Vui lòng chọn mức cọc");

  const payload = {
    Deposit: percentage.toLocaleString(),
    accountId: user?.id,
  };

  try {
    await MyEventOrganizeService.chooseDeposit(selectedEvent?.requestId, payload);
    alert(`Đã chọn mức cọc ${percentage}% cho sự kiện ${selectedEvent?.name}`);
    setChooseDepositVisible(false);
    setSelectedEvent(null);
  } catch (err) {
    console.error("Choose deposit error:", err.response?.data); // Log chi tiết lỗi
    alert("Gửi mức cọc thất bại: " + (err.response?.data?.message || err.message || "Lỗi không xác định"));
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
        return !contract && filters[status] && eventNameMatches;
      case 1:
        return contract && contractStatus === "Created" && eventNameMatches;
      case 2:
        return contract && contractStatus === "Deposited" && eventNameMatches;
      case 3:
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
          {item.status?.trim() !== "Cancel" && (
            <>
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

              {!contracts.find((c) => c.requestId === item.requestId) && (
                <>
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

                  {item.status?.trim() === "Browsed" &&
                    canShowChooseDeposit[item.requestId] && (
                      <Button
                        icon="percent"
                        mode="contained"
                        compact
                        onPress={() => {
                          setSelectedEvent(item);
                          setChooseDepositVisible(true);
                        }}
                        style={styles.actionButton}
                      >
                        Choose Deposit
                      </Button>
                    )}
                </>
              )}

              {contracts.find((c) => c.requestId === item.requestId) && (
                <>
                  <Button
                    icon="file-document"
                    mode="outlined"
                    compact
                    onPress={() => {
                      const contract = contracts.find(
                        (c) => c.requestId === item.requestId
                      );
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

                  {["Created", "Deposited"].includes(
                    contracts.find((c) => c.requestId === item.requestId)?.status?.trim()
                  ) && (
                    <Button
                      icon="cancel"
                      mode="outlined"
                      compact
                      onPress={() => {
                        const contract = contracts.find(
                          (c) => c.requestId === item.requestId
                        );
                        alert("Hủy hợp đồng: " + contract.contractId);
                      }}
                      style={styles.actionButton}
                    >
                      Cancel Contract
                    </Button>
                  )}

                  {contracts.find((c) => c.requestId === item.requestId)?.status?.trim() ===
                    "Created" && (
                    <Button
                      icon="credit-card"
                      mode="contained"
                      compact
                      onPress={() =>
                        handleDeposit(
                          "VNPay",
                          contracts.find((c) => c.requestId === item.requestId).contractId,
                          item
                        )
                      }
                      style={styles.actionButton}
                    >
                      Pay Deposit
                    </Button>
                  )}

                  {contracts.find((c) => c.requestId === item.requestId)?.status?.trim() ===
                    "Deposited" && (
                    <Button
                      icon="credit-card"
                      mode="contained"
                      compact
                      onPress={() => {
                        const contract = contracts.find(
                          (c) => c.requestId === item.requestId
                        );
                        handlePayRemaining(contract.amount, contract.contractId);
                      }}
                      style={styles.actionButton}
                    >
                      Pay Remaining
                    </Button>
                  )}

                  {contracts.find((c) => c.requestId === item.requestId)?.status?.trim() ===
                    "Completed" && (
                    <Button
                      icon="message-text"
                      mode="contained"
                      compact
                      onPress={() => {
                        const contract = contracts.find(
                          (c) => c.requestId === item.requestId
                        );
                        navigation.navigate("FeedbackScreen", {
                          event: item,
                          contract: contract,
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
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderHero title="My Event Organization" />

      <TextInput
        style={styles.searchBox}
        placeholder="Search by name or date (DD/MM/YYYY)"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

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

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : filteredEvents.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
          Không có sự kiện nào phù hợp
        </Text>
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
      <ChooseDepositModal
        visible={chooseDepositVisible}
        onClose={() => {
          setChooseDepositVisible(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleChooseDeposit}
        event={selectedEvent}
      />
    </View>
  );
};

export default MyEventScreen;