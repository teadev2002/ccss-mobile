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


  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderService.getAllOrdersByAccountId(user?.id);
  
      const sortedResponse = response.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
  
      const mappedOrders = sortedResponse.map((order) => ({
        orderId: order.orderId,
        date: formatDate(order.orderDate),
        total: order.totalPrice,
        status: mapOrderStatus(order.orderStatus),
        products: order.orderProducts.map((p) => ({
          name: p.product?.productName || "Unknown",
          quantity: p.quantity,
          price: p.price,
          image: p.product?.productImages?.[0]?.urlImage || "",
        })),
        address: "Updating...",
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

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.orderId} numberOfLines={1} ellipsizeMode="tail">
            #{item.orderId}
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order history</Text>
        <View style={{ width: 24 }} />
      </View>

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
                    Order ID: {selectedOrder.orderId}
                  </Text>
                  <Text style={styles.detailText}>
                    Date: {selectedOrder.date}
                  </Text>
                  <Text style={styles.detailText}>
                    Status: {selectedOrder.status}
                  </Text>
                  <Text style={styles.detailText}>
                    Total: ₫{selectedOrder.total?.toLocaleString()}
                  </Text>

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

                  <Text style={styles.sectionTitle}>🏠 Delivery Address</Text>
                  <Text style={styles.detailText}>
                    {selectedOrder.address || "Updating..."}
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
