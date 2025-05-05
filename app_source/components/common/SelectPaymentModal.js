import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../../../assets/css/paymentModalStyle";

const SelectPaymentModal = ({ visible, onClose, onSelectPaymentMethod }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => {
              onSelectPaymentMethod("VNPay");
              onClose();
            }}
          >
            <Text style={styles.paymentText}>Thanh toán bằng VNPay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => {
              onSelectPaymentMethod("Momo");
              onClose();
            }}
          >
            <Text style={styles.paymentText}>Thanh toán bằng Momo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectPaymentModal;
