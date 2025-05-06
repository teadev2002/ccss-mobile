import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/OrderDetailStyle"; // Reuse hoặc tách riêng file CSS ra

const OrderDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params; // 🛒 nhận dữ liệu từ OrderHistoryScreen khi navigate

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <LinearGradient colors={["#510545", "#22668a"]} style={styles.header}>
        <Button
          style={styles.backButton}
          icon={() => <Ionicons name="arrow-back" size={24} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Order Details</Text>
      </LinearGradient>

      {/* Nội dung */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailContainer}>
          <Text style={styles.sectionTitle}>🧾 Order Info</Text>
          <Text style={styles.detailText}>Order ID: {order.orderId}</Text>
          <Text style={styles.detailText}>Date: {order.date}</Text>
          <Text style={styles.detailText}>Status: {order.status}</Text>
          <Text style={styles.detailText}>
            Total: ₫{order.total.toLocaleString()}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>📦 Products</Text>
          {order.products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productQuantity}>
                x{product.quantity} — ₫{product.price.toLocaleString()}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>🏠 Delivery Address</Text>
          <Text style={styles.detailText}>
            {order.address || "Updating..."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailScreen;
