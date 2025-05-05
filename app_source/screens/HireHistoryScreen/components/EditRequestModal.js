import React from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";

const EditRequestModal = ({
  data,
  setData,
  onCancel,
  onSave,
  characters,
  cosplayers,
  onChangeCosplayer,
}) => {
  const { charactersList } = data;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.modalTitle}>Edit Hire Request</Text>

          <TextInput
            placeholder="Location"
            value={data.location}
            onChangeText={(text) => setData((prev) => ({ ...prev, location: text }))}
            style={styles.modalInput}
          />

          {charactersList.map((char, index) => (
            <View key={index} style={{ marginVertical: 8 }}>
              <Text style={{ fontWeight: "bold" }}>
                🎭 {characters[char.characterId]?.characterName || "Unknown"}
              </Text>
              <Text>
                Cosplayer: {cosplayers[char.cosplayerId]?.name || "Unknown"}
              </Text>
              <Button
                mode="outlined"
                onPress={() =>
                  onChangeCosplayer({
                    characterId: char.characterId,
                    currentCosplayerId: char.cosplayerId,
                  })
                }
              >
                🔁 Change Cosplayer
              </Button>
            </View>
          ))}

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Button onPress={onCancel}>Cancel</Button>
            <Button mode="contained" onPress={onSave}>
              Save (temporary)
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditRequestModal;
