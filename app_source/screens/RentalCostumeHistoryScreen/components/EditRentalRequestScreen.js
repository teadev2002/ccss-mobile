import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";
import { Picker } from "@react-native-picker/picker";
export default function EditRentalRequestScreen({ route, navigation }) {
  const { rentalData } = route.params;

  const [name, setName] = useState(rentalData.name);
  const [description, setDescription] = useState(rentalData.description || "");
  const [location, setLocation] = useState(rentalData.location);
  const [deposit] = useState(rentalData.deposit.toString());
  const [characterOptions, setCharacterOptions] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [costumes, setCostumes] = useState(
    rentalData.charactersListResponse?.map((c) => ({
      id: c.requestCharacterId,
      costume: c.characterName,
      characterId: c.characterId || "",
      description: c.description || "",
      maxHeight: c.maxHeight || 0,
      minHeight: c.minHeight || 0,
      maxWeight: c.maxWeight || 0,
      minWeight: c.minWeight || 0,
      quantity: c.quantity || 1,
      unitPrice: rentalData.price || 0, // hoặc đơn giá theo costume nếu có riêng
      totalPrice: (rentalData.price || 0) * (c.quantity || 1),
    })) || []
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await MyRentalCostumeService.getAllCharacters();
        console.log("Fetched characters:", data);

        setCharacters(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách character:", error.message);
      }
    };
    fetchCharacters();
  }, []);

  const handleAddCostume = () => {
    setCostumes([
      ...costumes,
      {
        id: Date.now().toString(),
        costume: "", // to be selected later
        description: "",
        maxHeight: 0,
        minHeight: 0,
        maxWeight: 0,
        minWeight: 0,
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
      },
    ]);
  };

  const handleRemoveCostume = (id) => {
    setCostumes(costumes.filter((item) => item.id !== id));
  };

  const handleCharacterChange = (index, selectedId) => {
    const selectedCharacter = characters.find(
      (c) => c.characterId === selectedId
    );
    const newCostumes = [...costumes];
    newCostumes[index] = {
      ...newCostumes[index],
      characterId: selectedId,
      costume: selectedCharacter.characterName,
      description: selectedCharacter.description,
      maxHeight: selectedCharacter.maxHeight,
      minHeight: selectedCharacter.minHeight,
      maxWeight: selectedCharacter.maxWeight,
      minWeight: selectedCharacter.minWeight,
      unitPrice: selectedCharacter.price,
      totalPrice: selectedCharacter.price * newCostumes[index].quantity,
    };
    setCostumes(newCostumes);
  };

  const handleSave = () => {
    // Update logic/API call
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Rental Request</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />

      <Text>📅 Start Date: {rentalData.startDate}</Text>
      <Text>📅 Return Date: {rentalData.endDate}</Text>
      <Text>💰 Deposit: {deposit} VND</Text>

      {/* Costume Section */}
      <View style={styles.costumeHeader}>
        <Text style={styles.subtitle}>🎭 Costumes</Text>
        <TouchableOpacity onPress={handleAddCostume} style={styles.addBtn}>
          <Text style={{ color: "#fff" }}>➕ Add Costume</Text>
        </TouchableOpacity>
      </View>

      {costumes.map((item, index) => (
        <View key={item.id} style={styles.costumeCard}>
          {/* Costume Picker Placeholder */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={item.characterId}
              onValueChange={(value) => handleCharacterChange(index, value)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select Character --" value="" />
              {characters.map((char) => (
                <Picker.Item
                  key={char.characterId}
                  label={char.characterName}
                  value={char.characterId}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            value={item.costume}
            editable={false}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={item.description}
            onChangeText={(text) => {
              const newData = [...costumes];
              newData[index].description = text;
              setCostumes(newData);
            }}
          />

          <Text style={styles.label}>Max Height: {item.maxHeight} cm</Text>
          <Text style={styles.label}>Min Height: {item.minHeight} cm</Text>
          <Text style={styles.label}>Max Weight: {item.maxWeight} kg</Text>
          <Text style={styles.label}>Min Weight: {item.minWeight} kg</Text>

          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={(text) => {
              const newData = [...costumes];
              newData[index].quantity = parseInt(text) || 1;
              setCostumes(newData);
            }}
          />

          <Text style={styles.label}>
            Unit Price: {item.unitPrice.toLocaleString()} VND
          </Text>
          <Text style={styles.label}>
            Total Price: {item.totalPrice.toLocaleString()} VND
          </Text>

          <TouchableOpacity
            onPress={() => handleRemoveCostume(item.id)}
            style={styles.removeBtn}
          >
            <Text style={{ color: "#fff" }}>🗑 Remove Costume</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>💾 Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "600" },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 8 },
  label: { fontWeight: "600", marginTop: 8 },
  costumeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  addBtn: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
  costumeCard: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  removeBtn: {
    backgroundColor: "#d9534f",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  saveText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
  },
});
