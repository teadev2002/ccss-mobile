import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styles from "../styles/MyEventScreenStyle"; // Điều chỉnh đường dẫn nếu cần

const ChooseDepositModal = ({ visible, onClose, onConfirm, event }) => {
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const depositOptions = [30, 50, 70];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Deposit Percentage</Text>
          <Text style={styles.modalSubtitle}>
            Event: {event?.name} (Price: {event?.price.toLocaleString()} VND)
          </Text>

          <View style={styles.depositOptions}>
            {depositOptions.map((percentage) => (
              <TouchableOpacity
                key={percentage}
                style={[
                  styles.depositOption,
                  selectedDeposit === percentage && styles.depositOptionSelected,
                ]}
                onPress={() => setSelectedDeposit(percentage)}
              >
                <Text
                  style={[
                    styles.depositOptionText,
                    selectedDeposit === percentage && styles.depositOptionTextSelected,
                  ]}
                >
                  {percentage}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => onConfirm(selectedDeposit)}
              disabled={!selectedDeposit}
              style={styles.modalButton}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseDepositModal;