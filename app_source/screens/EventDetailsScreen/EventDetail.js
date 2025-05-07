import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./EventDetailStyle";
import FestivalService from "../../apiServices/festivalService/festivalService";
import pluralize from "../../helpers/pluralize";
import { Ionicons } from "@expo/vector-icons";
import SelectPaymentModal from "../../components/common/SelectPaymentModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import PaymentService from "../../apiServices/paymentService/paymentService";
import PaymentPurpose from "../../const/PaymentPurpose";
import { AuthContext } from "../../../assets/context/AuthContext";
import Toast from "react-native-toast-message";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const EventDetail = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [event, setEvent] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [expandedCharacter, setExpandedCharacter] = useState(null);
  const { user } = useContext(AuthContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const toggleCharacter = (id) => {
    setExpandedCharacter((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventdata = await FestivalService.getEventById(eventId);
        setEvent(eventdata);
        if (eventdata?.eventCharacterResponses?.length > 0) {
          const ids = eventdata.eventCharacterResponses.map(
            (c) => c.characterId
          );
          const promises = ids.map((id) => FestivalService.getCharaterById(id));
          const results = await Promise.all(promises);
          setCharacters(results);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sự kiện:", error);
        Alert.alert("Lỗi", "Không thể tải dữ liệu sự kiện.");
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleQuantityChange = (ticketId, value) => {
    const ticket = event.ticket.find((t) => t.ticketId === ticketId);
    if (!ticket) return;

    if (value > ticket.quantity) {
      Toast.show({
        type: "error",
        text1: "⚠️ Not enough tickets!",
        text2: `Only ${ticket.quantity} tickets available.`,
      });
      return;
    }

    setSelectedQuantity((prev) => {
      const newSelected = { ...prev };
      if (value > 0) {
        newSelected[ticketId] = value;
      } else {
        delete newSelected[ticketId];
      }
      return newSelected;
    });
  };

  const toggleActivity = (id) => {
    setExpandedActivity((prev) => (prev === id ? null : id));
  };

  const calculateTotal = () => {
    let total = 0;
    event.ticket?.forEach((ticket) => {
      const qty = selectedQuantity[ticket.ticketId] || 0;
      total += qty * ticket.price;
    });
    return total;
  };

  const handleOrder = () => {
    if (Object.keys(selectedQuantity).length === 0) {
      Alert.alert("⚠️ No ticket selected!", "Please select one ticket type!");
      return;
    }
    setShowPaymentModal(true);
  };
  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmPayment = async () => {
    setShowConfirmationModal(false);
    try {
      const total = calculateTotal();
      const [ticketId] = Object.keys(selectedQuantity);
      const ticketQuantity = selectedQuantity[ticketId].toString();

      const paymentData = {
        fullName: user?.accountName,
        orderInfo: "Ticket Checkout",
        amount: total,
        purpose: PaymentPurpose.TICKET_PURCHASE,
        accountId: user?.id,
        ticketId,
        ticketQuantity: ticketQuantity,
        isWeb: false,
      };

      if (selectedPaymentMethod === "Momo") {
        const res = await PaymentService.createMomoPayment(paymentData);
        if (res?.url)
          navigation.navigate("PaymentWebviewScreen", { paymentUrl: res.url });
      } else if (selectedPaymentMethod === "VNPay") {
        const res = await PaymentService.createVnpayPayment(paymentData);
        if (res?.url)
          navigation.navigate("PaymentWebviewScreen", { paymentUrl: res.url });
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      Alert.alert("Error", "Không thể thanh toán. Vui lòng thử lại!");
    }
  };

  const handleCancelPayment = () => {
    setShowConfirmationModal(false);
  };

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>🔄 Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backOverlayButton}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Image
          source={{
            uri:
              // event.eventImageResponses?.[0]?.imageUrl ||
              "https://www.mmogames.com/wp-content/uploads/2018/05/blizzcon-cosplayer-army.jpg",
          }}
          style={styles.eventImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.eventName}>{event.eventName}</Text>
          <Text style={styles.location}>{event.location}</Text>
          <Text style={styles.date}>
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{event.description}</Text>

      {/* Ticket Section */}
      <Text style={styles.sectionTitle}>🎫 Ticket Type</Text>
      {event.ticket?.map((ticket) => {
        const isSoldOut = ticket.quantity <= 0;
        return (
          <View
            key={ticket.ticketId}
            style={[styles.ticketCard, isSoldOut && { opacity: 0.5 }]}
          >
            <Text style={styles.ticketType}>
              {ticket.ticketType === 0 ? "🎭 Normal" : "🎉 Premium "}
            </Text>
            <Text>{ticket.description}</Text>
            <Text style={styles.price}>
              Price: {ticket.price.toLocaleString()}đ
            </Text>

            <Text>
              {isSoldOut
                ? "🚫 Sold Out"
                : `In stock: ${ticket.quantity} ${pluralize(
                    ticket.quantity,
                    "ticket"
                  )}`}
            </Text>

            {!isSoldOut && (
              <View style={styles.quantityContainer}>
                <Text style={styles.selectText}>Select quantity:</Text>
                <Picker
                  selectedValue={selectedQuantity[ticket.ticketId] || 0}
                  onValueChange={(value) =>
                    handleQuantityChange(ticket.ticketId, value)
                  }
                  style={styles.picker}
                  dropdownIconColor="#000"
                >
                  {Array.from({ length: ticket.quantity + 1 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>
            )}

            {selectedQuantity[ticket.ticketId] > 0 && (
              <Text style={styles.selectedInfo}>
                ✅ Selected: {selectedQuantity[ticket.ticketId]}{" "}
                {pluralize(selectedQuantity[ticket.ticketId], "ticket")}
              </Text>
            )}
          </View>
        );
      })}

      {/* Activity Section */}
      <Text style={styles.sectionTitle}>
        🏃 {pluralize(event.eventActivityResponse?.length || 0, "Activity")}
      </Text>
      {event.eventActivityResponse?.map((item) => (
        <TouchableOpacity
          key={item.eventActivityId}
          onPress={() => toggleActivity(item.eventActivityId)}
          style={styles.activityCard}
        >
          <Text style={styles.activityName}>{item.activity.name}</Text>
          {expandedActivity === item.eventActivityId && (
            <View style={styles.activityDetail}>
              <Text style={styles.activityDesc}>
                {item.activity.description}
              </Text>
              <Text style={styles.activityNote}>{item.description}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* Characters Section */}
      {characters.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            🧙 {pluralize(characters.length, "Character")}
          </Text>
          <View style={styles.characterGrid}>
            {characters.map((char, index) => {
              const isSingle = characters.length === 1;
              const isLastOdd =
                characters.length % 2 === 1 && index === characters.length - 1;

              return (
                <TouchableOpacity
                  key={char.characterId}
                  style={[
                    styles.characterCardWrapper,
                    isLastOdd && styles.oddLastCharacter,
                    isSingle && styles.singleCharacterCard,
                  ]}
                  onPress={() => toggleCharacter(char.characterId)}
                  activeOpacity={0.8}
                >
                  {char.images?.[0]?.urlImage && (
                    <Image
                      // source={{ uri: char.images[0].urlImage }}
                      source={{
                        uri: "https://i0.wp.com/ic.pics.livejournal.com/mnarutocosplay/65073251/13297/13297_original.jpg",
                      }}
                      style={styles.characterImage}
                    />
                  )}
                  <Text style={styles.characterName}>{char.characterName}</Text>

                  {expandedCharacter === char.characterId && (
                    <View style={styles.characterDetail}>
                      <Text>{char.description}</Text>
                      <Text>💰 Giá: {char.price.toLocaleString()}đ</Text>
                      <Text>
                        📏 Chiều cao: {char.minHeight} - {char.maxHeight} cm
                      </Text>
                      <Text>
                        ⚖️ Cân nặng: {char.minWeight} - {char.maxWeight} kg
                      </Text>
                      <Text>
                        📦 Còn lại: {char.quantity}{" "}
                        {pluralize(char.quantity, "slot")}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {/* Total + Order */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total Prices: {calculateTotal().toLocaleString()}đ
        </Text>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderText}>🚀 Order Now</Text>
        </TouchableOpacity>
      </View>
      {/* Payment Modals */}
      <SelectPaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectPaymentMethod={handleSelectPaymentMethod}
      />

      <ConfirmationModal
        visible={showConfirmationModal}
        onClose={handleCancelPayment}
        onConfirm={handleConfirmPayment}
        paymentMethod={selectedPaymentMethod}
      />
    </ScrollView>
  );
};

export default EventDetail;
