import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import HireCosplayerService from "../../../apiServices/hireCosplayerService/hireCosplayerService";
import moment from "moment";
import { HireFlowContext } from "../../../../assets/context/HireFlowContext";


const CharacterCosplayerModal = ({
  visible,
  character,
  onClose,
  onConfirm,
  usedCosplayerIds = [],
}) => {
  const { formData, timeData } = useContext(HireFlowContext);
  const [cosplayers, setCosplayers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  const buildDatesArray = () => {
    return Object.keys(timeData).map((dateKey) => {
      const day = moment(dateKey, "DD-MM-YYYY").format("DD/MM/YYYY");
      return {
        startDate: `${timeData[dateKey].start} ${day}`,
        endDate: `${timeData[dateKey].end} ${day}`,
      };
    });
  };

  useEffect(() => {
    if (!visible || !character) return;

    const fetchCosplayers = async () => {
      try {
        const dates = buildDatesArray();
        const res = await HireCosplayerService.getAccountNoTaskByCharacterId({
          characterId: character.characterId,
          dates,
          accountId: "", // nếu sau này muốn thêm lọc accountId thì có thể dùng formData.accountId ở đây
        });

        const filtered = res
          .filter((cos) => {
            const heightOk =
              cos.height >= character.minHeight &&
              cos.height <= character.maxHeight;
            const weightOk =
              cos.weight >= character.minWeight &&
              cos.weight <= character.maxWeight;
            const isUsed = usedCosplayerIds.includes(cos.accountId);
            return heightOk && weightOk && !isUsed;
          })
          .map((cos) => ({
            ...cos,
            image: cos.images?.find((img) => img.urlImage)?.urlImage || null,
          }));

        setCosplayers(filtered);
      } catch (err) {
        console.error("Lỗi tải danh sách cosplayer:", err);
      }
    };

    fetchCosplayers();
    setSelected([]);
  }, [visible, character, usedCosplayerIds]);

  const toggleSelect = (cos) => {
    setSelected((prev) =>
      prev.some((c) => c.accountId === cos.accountId)
        ? prev.filter((c) => c.accountId !== cos.accountId)
        : [...prev, cos]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>
          Select Cosplayer for {character?.characterName}
        </Text>
        <ScrollView>
          {cosplayers.map((cos, idx) => {
            const isSelected = selected.some(
              (c) => c.accountId === cos.accountId
            );
            return (
              <TouchableOpacity
                key={`${cos.accountId}-${idx}`}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggleSelect(cos)}
              >
                {!imageErrors[cos.accountId] && cos.image && (
                  <Image
                    source={{ uri: cos.image }}
                    style={styles.image}
                    onError={() =>
                      setImageErrors((prev) => ({
                        ...prev,
                        [cos.accountId]: true,
                      }))
                    }
                  />
                )}
                <View style={styles.info}>
                  <Text style={styles.name}>{cos.name}</Text>
                  <Text>
                    ⭐ {cos.averageStar} | 💰 {cos.salaryIndex.toLocaleString()}đ
                  </Text>
                  <Text>
                    {cos.height} cm | {cos.weight} kg
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={() => onConfirm(selected)}
          >
            <Text style={styles.btnText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CharacterCosplayerModal;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  cardSelected: { borderColor: "#22668a", backgroundColor: "#e0f0ff" },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  btnCancel: {
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  btnConfirm: {
    backgroundColor: "#22668a",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
