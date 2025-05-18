import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../styles/EditEventModalStyle";
import { Text, Button, Card } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import CharacterDetailsItem from "./CharacterDetailsItem";
import CharacterSelectorModal from "./CharacterSelectorModal";
import DetailEventOrganizationPageService from './../../../apiServices/eventOrganizeService/DetailEventOrganizationPageService';

const EditEventModal = ({ visible, onClose, event }) => {
  const [characters, setCharacters] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [open, setOpen] = useState(false);

  const [showCharModal, setShowCharModal] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await DetailEventOrganizationPageService.getAllPackages();
        if (res && Array.isArray(res)) {
          const mapped = res.map((pkg) => ({
            label: `${pkg.packageName} - ${pkg.price.toLocaleString()} VND`,
            value: pkg.packageId,
          }));
          setPackages(mapped);
          if (event?.packageId) {
            setSelectedPackage(event.packageId);
          }
        }
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };

    if (visible) {
      fetchPackages();
    }
  }, [visible]);

  useEffect(() => {
    if (event) {
      setCharacters(
        event.charactersListResponse?.map((char) => ({
          characterId: char.characterId,
          name: char.characterName,
          price: 120000,
          quantity: char.quantity,
        })) || []
      );
    }
  }, [event]);

  useEffect(() => {
    const total = characters.reduce((sum, c) => sum + c.price * c.quantity, 0);
    setTotalPrice(total);
  }, [characters]);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.header}>🎨 Edit Event Request</Text>

            {/* Package */}
            <Card style={styles.card}>
              <Card.Title title="📦 Package" titleStyle={styles.sectionTitle} />
              <Card.Content>
                <DropDownPicker
                  open={open}
                  value={selectedPackage}
                  items={packages}
                  setOpen={setOpen}
                  setValue={setSelectedPackage}
                  setItems={setPackages}
                  placeholder="Select a package"
                  zIndex={1000}
                  zIndexInverse={3000}
                  style={{ marginBottom: open ? 200 : 10 }}
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
                      {c.name} - {c.price.toLocaleString()} VND x {c.quantity}
                    </Text>
                  </View>
                ))}
                <Button
                  mode="outlined"
                  onPress={() => setShowCharModal(true)}
                  style={{ marginTop: 8 }}
                >
                  + Add / Edit Characters
                </Button>
              </Card.Content>
            </Card>

            {/* Event Info */}
            <Card style={styles.card}>
              <Card.Title title="📋 Event Info" titleStyle={styles.sectionTitle} />
              <Card.Content>
                <Text style={styles.detailItem}>📍 Location: {event?.location}</Text>
                <Text style={styles.detailItem}>📅 Start Date: {event?.startDate}</Text>
                <Text style={styles.detailItem}>📅 End Date: {event?.endDate}</Text>
                <Text style={styles.detailItem}>🧾 Deposit: {event?.deposit || 0}%</Text>
                <Text style={styles.detailItem}>🕒 Total Date: {event?.totalDate}</Text>
                <Text style={styles.detailItem}>💰 Unit Price Range: {event?.range}</Text>
                <Text style={styles.detailItem}>💵 Total Price: {totalPrice.toLocaleString()} VND</Text>
              </Card.Content>
            </Card>

            {/* Character Detail */}
            <Text style={styles.subHeader}>🔍 Character Details</Text>
            {event?.charactersListResponse?.map((char, idx) => (
              <CharacterDetailsItem
                key={idx}
                character={{
                  name: char.characterName,
                  quantity: char.quantity,
                  description: char.description,
                  maxHeight: char.maxHeight,
                  maxWeight: char.maxWeight,
                  minHeight: char.minHeight,
                  minWeight: char.minWeight,
                  status: char.status || "Pending",
                  image: char.characterImages?.[0]?.urlImage || "",
                }}
              />
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
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Character Selector Modal */}
      <CharacterSelectorModal
        visible={showCharModal}
        onClose={() => setShowCharModal(false)}
        selectedCharacters={characters}
        onConfirm={(selected) => {
          setCharacters(selected);
          setShowCharModal(false);
        }}
      />
    </Modal>
  );
};

export default EditEventModal;
