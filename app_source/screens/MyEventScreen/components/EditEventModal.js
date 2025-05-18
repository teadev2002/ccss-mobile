import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  
  ScrollView,
} from "react-native";
import styles from "../styles/EditEventModalStyle";
import { Text, Button, Card } from "react-native-paper";
import CharacterDetailsItem from "./CharacterDetailsItem";

const EditEventModal = ({ visible, onClose }) => {
  const [characters, setCharacters] = useState([
    { name: "Sasuke", price: 120000, quantity: 4 },
    { name: "Naruto", price: 100000, quantity: 3 },
  ]);

  const characterDetails = [
    {
      name: "Sasuke",
      quantity: 4,
      description: "shared",
      maxHeight: 185,
      maxWeight: 85,
      minHeight: 165,
      minWeight: 55,
      status: "Accept",
      image: "https://i.imgur.com/Y1Hl1rU.png",
    },
  ];

  const [packageOption, setPackageOption] = useState(
    "Advanced Cosplay Training - 2,500,000 VND"
  );

  const totalPrice = characters.reduce(
    (sum, c) => sum + c.price * c.quantity,
    0
  );

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🎨 Edit Event Request</Text>

        {/* Package */}
        <Card style={styles.card}>
          <Card.Title title="📦 Package" titleStyle={styles.sectionTitle} />
          <Card.Content>
            <TextInput
              style={styles.input}
              value={packageOption}
              onChangeText={setPackageOption}
            />
          </Card.Content>
        </Card>

        {/* Characters */}
        <Card style={styles.card}>
          <Card.Title title="👥 Characters" titleStyle={styles.sectionTitle} />
          <Card.Content>
            {characters.map((c, index) => (
              <View key={index} style={styles.characterRow}>
                <Text style={styles.charText}>
                  {c.name} - {c.price.toLocaleString()} VND
                </Text>
                <TextInput
                  style={styles.qtyInput}
                  keyboardType="numeric"
                  value={c.quantity.toString()}
                  onChangeText={(val) => {
                    const copy = [...characters];
                    copy[index].quantity = parseInt(val || 0);
                    setCharacters(copy);
                  }}
                />
                <Button
                  mode="text"
                  onPress={() => {
                    const copy = [...characters];
                    copy.splice(index, 1);
                    setCharacters(copy);
                  }}
                  textColor="red"
                >
                  Remove
                </Button>
              </View>
            ))}
            <Button
              mode="outlined"
              onPress={() =>
                setCharacters([
                  ...characters,
                  { name: "New Character", price: 110000, quantity: 1 },
                ])
              }
              style={{ marginTop: 8 }}
            >
              + Add Character
            </Button>
          </Card.Content>
        </Card>

        {/* Additional Details */}
        <Card style={styles.card}>
          <Card.Title title="📋 Event Info" titleStyle={styles.sectionTitle} />
          <Card.Content>
            <Text style={styles.detailItem}>📍 Location: Daklak</Text>
            <Text style={styles.detailItem}>📅 Start Date: 23/05/2025</Text>
            <Text style={styles.detailItem}>📅 End Date: 23/05/2025</Text>
            <Text style={styles.detailItem}>🧾 Deposit: 0%</Text>
            <Text style={styles.detailItem}>🕒 Total Date: 1</Text>
            <Text style={styles.detailItem}>💰 Unit Price Range: 24,000 - 42,000 VND</Text>
            <Text style={styles.detailItem}>💵 Total Price: {totalPrice.toLocaleString()} VND</Text>
          </Card.Content>
        </Card>

        {/* Character Detail */}
        <Text style={styles.subHeader}>🔍 Character Details</Text>
        {characterDetails.map((char, idx) => (
          <CharacterDetailsItem key={idx} character={char} />
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Button mode="outlined" onPress={onClose} style={styles.footerBtn}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Saved")}
            style={styles.footerBtn}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditEventModal;
