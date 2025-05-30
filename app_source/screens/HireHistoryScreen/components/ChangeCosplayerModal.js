import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button, ActivityIndicator, Surface } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";
import HireCosplayerService from "../../../apiServices/hireCosplayerService/hireCosplayerService";
import CharacterService from "../../../apiServices/characterService/CharacterService";

const ChangeCosplayerModal = ({
  characterId,
  currentCosplayerId,
  
  requestDateResponses,
  cosplayers,
  onCancel,
  onConfirm,
}) => {
  const [availableCosplayers, setAvailableCosplayers] = useState([]);
  const [selectedCosplayerId, setSelectedCosplayerId] =
    useState(currentCosplayerId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!characterId || !requestDateResponses) return;

    const fetchCharacterAndCosplayers = async () => {
      setLoading(true);
      try {
        const character = await CharacterService.getCharacterById(characterId);
        console.log("abc", JSON.stringify(character, null, 2));
        // Lấy dates
        const dates = requestDateResponses.map((item) => ({
          startDate: item.startDate,
          endDate: item.endDate,
        }));

        const payload = {
          characterId,
          dates,
          accountId: "",
        };

        const cosplayers =
          await HireCosplayerService.getAccountNoTaskByCharacterId(payload);

        // Lọc theo chiều cao cân nặng
        const filtered = cosplayers.filter(
          (cos) =>
            cos.height >= character.minHeight &&
            cos.height <= character.maxHeight &&
            cos.weight >= character.minWeight &&
            cos.weight <= character.maxWeight
        );

        setAvailableCosplayers(filtered);
      } catch (error) {
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterAndCosplayers();
  }, [characterId, requestDateResponses]);

  if (loading) {
    return (
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalBox,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Loading cosplayers...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalBox, { padding: 20 }]}>
        <Text style={[styles.modalTitle, { marginBottom: 20 }]}>
          Select Another Cosplayer
        </Text>

        <ScrollView style={{ maxHeight: 280, marginBottom: 20 }}>
          {availableCosplayers.length === 0 && (
            <Text
              style={{
                fontStyle: "italic",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              No cosplayers available for this character.
            </Text>
          )}

          {availableCosplayers.map((cosplayer) => {
            
            const isSelected = selectedCosplayerId === cosplayer.accountId;
            return (
              <Surface
                key={cosplayer.accountId}
                style={{
                  marginBottom: 12,
                  padding: 15,
                  borderRadius: 8,
                  elevation: isSelected ? 4 : 1,
                  backgroundColor: isSelected ? "#d0f0c0" : "#fff",
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? "#4caf50" : "#ccc",
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedCosplayerId(cosplayer.accountId)}
                >
                  <Text
                    style={{ fontWeight: "600", fontSize: 16, marginBottom: 4 }}
                  >
                    {cosplayer.name}
                  </Text>
                  <Text style={{ color: "#555" }}>
                    Height: {cosplayer.height} cm | Rate:{" "}
                    {cosplayer.salaryIndex?.toLocaleString() || 0} VND/h
                    |Weight: {cosplayer.weight} kg
                  </Text>
                </TouchableOpacity>
              </Surface>
            );
          })}
        </ScrollView>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            mode="outlined"
            onPress={onCancel}
            style={{ flex: 1, marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            disabled={
              !selectedCosplayerId || selectedCosplayerId === currentCosplayerId
            }
            onPress={() => onConfirm(selectedCosplayerId)}
            style={{ flex: 1, marginLeft: 8 }}
          >
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChangeCosplayerModal;
