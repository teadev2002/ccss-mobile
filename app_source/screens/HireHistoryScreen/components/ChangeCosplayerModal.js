// components/hireHistory/ChangeCosplayerModal.js
import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";

const ChangeCosplayerModal = ({ onCancel, onConfirm }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.modalTitle}>Select another cosplayer</Text>

        <ScrollView style={{ maxHeight: 250 }}>
          {[1, 2, 3].map((i) => (
            <TouchableOpacity
              key={i}
              style={styles.fakeCosItem}
              onPress={() => {}}
            >
              <Text>🔥 Cosplayer {i} - (mock)</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button onPress={onCancel}>Cancel</Button>
          <Button mode="contained" onPress={onConfirm}>
            Confirm (temporary)
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChangeCosplayerModal;
