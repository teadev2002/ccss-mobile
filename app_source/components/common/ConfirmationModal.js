import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../../../assets/css/paymentModalStyle";

const ConfirmationModal = ({ visible, onClose, onConfirm, paymentMethod }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Bạn có chắc chắn muốn thanh toán bằng {paymentMethod}?
          </Text>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={onConfirm} // Đồng ý thanh toán
          >
            <Text style={styles.paymentText}>Đồng ý</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose} // Hủy
          >
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
