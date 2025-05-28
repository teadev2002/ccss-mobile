import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/OrderHistoryStyle";
import orderService from "../../apiServices/orderService/PurcharseHistoryService";
import { AuthContext } from "../../../assets/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import LocationPickerService from "../../apiServices/LocationService/LocationPickerService";
import HeaderHero from "../../components/common/HeaderHero";

const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  return `${dateObj.getDate().toString().padStart(2, "0")}/${(
    dateObj.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateObj.getFullYear()}`;
};

const mapOrderStatus = (status) => {
  switch (status) {
    case 1:
      return "Paid";
    case 0:
      return "Pending";
    case 2:
      return "Canceled";
    default:
      return "Unknown";
  }
};

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [shippingFee, setShippingFee] = useState(0);

  const formatShortOrderId = (id) => {
    if (!id) return "Unknown";
    const idStr = id.toString();
    const last4 = idStr.slice(-4);
    return `XXXXXXX${last4}`;
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);

      const orderResponse = await orderService.getAllOrdersByAccountId(
        user?.id
      );
      const sortedResponse = orderResponse.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      // Lấy shipping fee cho từng order song song
      const shippingFees = await Promise.all(
        sortedResponse.map((order) =>
          LocationPickerService.calculateDeliveryFee(order.orderId)
        )
      );

      const mappedOrders = sortedResponse.map((order, index) => ({
        orderId: order.orderId,
        date: formatDate(order.orderDate),
        subtotal: order.totalPrice,
        shippingFee: shippingFees[index],
        total: order.totalPrice + shippingFees[index],
        status: mapOrderStatus(order.orderStatus),
        deliveryStatus: order.shipStatus,
        address: order.address || "Updating...",
        phone: order.phone || "0123456789",
        note: order.description || "(None)",
        products: order.orderProducts.map((p) => ({
          name: p.product?.productName || "Unknown",
          quantity: p.quantity,
          price: p.price,
          image: p.product?.productImages?.[0]?.urlImage || "",
        })),
      }));

      setOrders(mappedOrders);
      setFilteredOrders(mappedOrders);
    } catch (error) {
      console.error("Error fetching real orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const applyFilter = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const renderShippingStatusBar = (status) => {
    const steps = [
      { label: "Confirmation", icon: "document-text" },
      { label: "Picked", icon: "cube" },
      { label: "In Transit", icon: "car" },
      { label: "Delivered", icon: "checkmark-done" },
    ];

    const currentIndex = Math.min(Number(status), steps.length - 1);

    return (
      <View style={{ marginVertical: 12, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={idx}>
                <View
                  style={{
                    alignItems: "center",
                    width: `${100 / steps.length}%`,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: isCompleted ? "#4caf50" : "#ccc",
                      borderRadius: 20,
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <Ionicons
                      name={step.icon}
                      size={16}
                      color={isCompleted ? "#fff" : "#555"}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: isCompleted ? "#4caf50" : "#999",
                      textAlign: "center",
                    }}
                  >
                    {step.label}
                  </Text>
                </View>

                {!isLast && (
                  <View
                    style={{
                      position: "absolute",
                      top: 15,
                      left: `${
                        (idx + 1) * (100 / steps.length) - 50 / steps.length
                      }%`,
                      width: `${100 / steps.length}%`,
                      height: 2,
                      backgroundColor: idx < currentIndex ? "#4caf50" : "#ccc",
                      zIndex: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.orderId} numberOfLines={1} ellipsizeMode="tail">
            #{formatShortOrderId(item.orderId)}
          </Text>
          <Text style={styles.orderDate}>📅 {item.date}</Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <View
            style={[
              styles.statusBadge,
              styles[`status_${item.status.toLowerCase()}`],
            ]}
          >
            <Text style={styles.statusBadgeText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.orderTotal}>💵 {item.total.toLocaleString()}đ</Text>

      <TouchableOpacity
        style={styles.viewDetailButton}
        onPress={() => {
          setSelectedOrder(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.viewDetailButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderHero title="Order History"></HeaderHero>

      {/* Filter */}
      <View style={styles.filterContainer}>
        {["All", "Pending", "Paid", "Canceled"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.filterButtonActive,
            ]}
            onPress={() => applyFilter(status)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === status && styles.filterButtonTextActive,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="royalblue"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.orderId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No order in list.</Text>
          }
        />
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {selectedOrder && (
                <>
                  <Text style={styles.sectionTitle}>🧾 Order Info</Text>
                  <Text style={styles.detailText}>
                    Order ID: {formatShortOrderId(selectedOrder.orderId)}
                  </Text>
                  <Text style={styles.detailText}>
                    Date: {selectedOrder.date}
                  </Text>
                  <Text style={styles.detailText}>
                    Status: {selectedOrder.status}
                  </Text>
                  <Text style={styles.detailText}>
                    Total: ₫{selectedOrder.total.toLocaleString()}
                  </Text>

                  <View style={styles.divider} />
                  <Text style={styles.sectionTitle}>🚚 Shipping Status</Text>
                  {renderShippingStatusBar(selectedOrder.deliveryStatus)}

                  <View style={styles.divider} />
                  <Text style={styles.sectionTitle}>📦 Products</Text>
                  {selectedOrder.products.length > 0 ? (
                    selectedOrder.products.map((product, idx) => (
                      <View key={idx} style={styles.productItem}>
                        {product.image ? (
                          <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                          />
                        ) : null}
                        <View style={{ flex: 1 }}>
                          <Text style={styles.productName}>{product.name}</Text>
                          <Text style={styles.productQuantity}>
                            x{product.quantity} — ₫
                            {product.price.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={{ color: "#666" }}>No products</Text>
                  )}

                  <View style={styles.divider} />
                  <Text style={styles.sectionTitle}>🧾 Order Summary</Text>
                  <Text style={styles.detailText}>
                    Purchase Date: {selectedOrder.date}
                  </Text>
                  <Text style={styles.detailText}>
                    Shipping Address: {selectedOrder.address}
                  </Text>
                  <Text style={styles.detailText}>
                    Phone: {selectedOrder.phone}
                  </Text>
                  <Text style={styles.detailText}>
                    Note: {selectedOrder.note}
                  </Text>
                  <Text style={styles.detailText}>
                    Subtotal: {selectedOrder.subtotal.toLocaleString()}₫
                  </Text>
                  <Text style={styles.detailText}>
                    Delivery Fee: {selectedOrder.shippingFee.toLocaleString()}₫
                  </Text>
                  <Text style={[styles.detailText, { fontWeight: "bold" }]}>
                    Total: {selectedOrder.total.toLocaleString()}₫
                  </Text>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderHistoryScreen;
