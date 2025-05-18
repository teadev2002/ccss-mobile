// components/CharacterSelectorModal.js
import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { Text, Button, Checkbox } from "react-native-paper";
import styles from "../styles/CharacterSelectStyle";
import DetailEventOrganizationPageService from "../../../apiServices/eventOrganizeService/DetailEventOrganizationPageService";

const CharacterSelectorModal = ({ visible, onClose, selectedCharacters, onConfirm }) => {
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await DetailEventOrganizationPageService.getAllCharacters();
        const withPrice = await Promise.all(
          res.map(async (char) => {
            const detail = await DetailEventOrganizationPageService.getCharacterById(char.characterId);
            return {
              ...char,
              price: detail.price || 100000, // fallback nếu không có giá
              quantity: selectedCharacters?.find((c) => c.characterId === char.characterId)?.quantity || 0,
              selected: selectedCharacters?.some((c) => c.characterId === char.characterId) || false,
            };
          })
        );
        setAllCharacters(withPrice);
      } catch (err) {
        console.error("Failed to fetch characters:", err);
      }
    };

    if (visible) fetchData();
  }, [visible]);

  const updateNote = (charId, note) => {
  setAllCharacters((prev) =>
    prev.map((c) =>
      c.characterId === charId ? { ...c, note } : c
    )
  );
};


  const toggleSelect = (charId) => {
    setAllCharacters((prev) =>
      prev.map((c) =>
        c.characterId === charId ? { ...c, selected: !c.selected } : c
      )
    );
  };

  const updateQuantity = (charId, quantity) => {
    setAllCharacters((prev) =>
      prev.map((c) =>
        c.characterId === charId ? { ...c, quantity: parseInt(quantity || 0) } : c
      )
    );
  };

  const handleConfirm = () => {
  const selected = allCharacters.filter((c) => c.selected && c.quantity > 0);
  onConfirm(selected); // trong selected sẽ có thêm `note` field
  onClose();
};


  const renderItem = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Image source={{ uri: item.images?.[0]?.urlImage }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text>{item.characterName}</Text>
        <Text>{item.price.toLocaleString()} VND</Text>
      </View>
      <Checkbox
        status={item.selected ? "checked" : "unchecked"}
        onPress={() => toggleSelect(item.characterId)}
      />
    </View>

    {item.selected && (
      <>
        <TextInput
          placeholder="Quantity"
          keyboardType="numeric"
          value={item.quantity.toString()}
          onChangeText={(val) => updateQuantity(item.characterId, val)}
          style={styles.qtyInput}
        />
        <TextInput
          placeholder="Note (optional)"
          value={item.note || ""}
          onChangeText={(text) => updateNote(item.characterId, text)}
          style={styles.noteInput}
        />
      </>
    )}
  </View>
);


  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>🎭 Select Characters</Text>
        <FlatList
          data={allCharacters}
          keyExtractor={(item) => item.characterId}
          renderItem={renderItem}
        />
        <View style={styles.footer}>
          <Button mode="outlined" onPress={onClose}>Cancel</Button>
          <Button mode="contained" onPress={handleConfirm}>Confirm</Button>
        </View>
      </View>
    </Modal>
  );
};



export default CharacterSelectorModal;