import React from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import styles from "../styles/OrderPreviewStyle"; // Make sure you style this modal

const OrderPreviewModal = ({
  visible,
  onClose,
  onConfirm,
  items,
  address,
  productTotal,
  shippingFee,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.modalTitle}>Order Preview</Text>

          <FlatList
            data={items}
            keyExtractor={(item) => item.cartProductId}
            renderItem={({ item }) => (
              <Text style={styles.itemText}>
                {item.name} x{item.quantity} - ₫
                {(item.price * item.quantity).toLocaleString()}
              </Text>
            )}
          />

          <Text style={styles.addressText}>Address: {address}</Text>
          <Text style={styles.totalText}>
            Product total: ₫{productTotal.toLocaleString()}
          </Text>
          <Text style={styles.totalText}>
            Shipping fee: ₫{shippingFee.toLocaleString()}
          </Text>
          <Text style={styles.totalText}>
            Total: ₫{(productTotal + shippingFee).toLocaleString()}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderPreviewModal;
