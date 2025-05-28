import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import styles from "../styles/OrderPreviewStyle";

const OrderPreviewModal = ({
  visible,
  onClose,
  onConfirm,
  items,
  address,
  productTotal,
  shippingFee,
}) => {
  const total = productTotal + shippingFee;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.modalTitle}>🧾 Order Preview</Text>

          <View style={styles.listContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.cartProductId}
              renderItem={({ item }) => (
                <View style={styles.itemRow}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>
                      📦 {item.name} x{item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ₫{(item.price * item.quantity).toLocaleString()}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.addressText}>🏠 Address: {address}</Text>

          <View style={styles.priceBlock}>
            <Text style={styles.totalText}>
              🧮 Product total: {productTotal.toLocaleString()}₫
            </Text>
          </View>

          <View style={styles.priceBlock}>
            <Text style={styles.totalText}>
              🚚 Shipping fee: {shippingFee.toLocaleString()} ₫
            </Text>
          </View>

          <View style={styles.priceBlock}>
            <Text style={styles.totalText}>
              💰 Total: {total.toLocaleString()}₫
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}> Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}> Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderPreviewModal;
