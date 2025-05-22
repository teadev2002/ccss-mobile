import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { Text, Button, Card } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../styles/EditEventModalStyle";
import CharacterDetailsItem from "./CharacterDetailsItem";
import CharacterSelectorModal from "./CharacterSelectorModal";
import DetailEventOrganizationPageService from "../../../apiServices/eventOrganizeService/DetailEventOrganizationPageService";

const EditEventModal = ({ visible, onClose, event }) => {
  const [characters, setCharacters] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const [open, setOpen] = useState(false);
  const [showCharModal, setShowCharModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!visible || !event) return;
    loadPackages(event.packageId);
    loadCharacters();
  }, [visible]);

  useEffect(() => {
    const total = characters.reduce((sum, c) => sum + c.price * c.quantity, 0);
    setTotalPrice(total);
  }, [characters]);

  const loadPackages = async (currentPackageId) => {
    try {
      const res = await DetailEventOrganizationPageService.getAllPackages();
      if (Array.isArray(res)) {
        const mapped = res.map((pkg) => ({
          label: `${pkg.packageName} - ${pkg.price.toLocaleString()} VND`,
          value: String(pkg.packageId), // đảm bảo value là string
          price: pkg.price,
        }));
        setPackages(mapped);

        const selected = mapped.find(
          (p) => p.value === String(currentPackageId)
        );
        setSelectedPackage(String(currentPackageId));
        setSelectedPackageData(selected || null);
      }
    } catch (err) {
      console.error("Failed to fetch packages", err);
    }
  };

  const loadCharacters = async () => {
    if (!event?.charactersListResponse) return;
    try {
      const details = await Promise.all(
        event.charactersListResponse.map(async (char) => {
          try {
            const res =
              await DetailEventOrganizationPageService.getCharacterById(
                char.characterId
              );
            return {
              characterId: char.characterId,
              name: char.characterName,
              quantity: char.quantity,
              price: res?.price || 0,
              description: char.description,
              maxHeight: char.maxHeight,
              maxWeight: char.maxWeight,
              minHeight: char.minHeight,
              minWeight: char.minWeight,
              status: char.status || "Pending",
              image: char.characterImages?.[0]?.urlImage || "",
            };
          } catch (err) {
            console.error("Fetch failed", char.characterId, err);
            return {
              characterId: char.characterId,
              name: char.characterName,
              quantity: char.quantity,
              price: 0,
            };
          }
        })
      );
      setCharacters(details);
    } catch (err) {
      console.error("Failed loading character list", err);
    }
  };

  const prepareEditRequestPayloadFromEvent = (event) => {
    const characterTotal = characters.reduce(
      (sum, c) => sum + c.price * c.quantity,
      0
    );
    const packagePrice = selectedPackageData?.price || 0;

    console.log(
      "🧪 Event trước khi tạo payload:",
      JSON.stringify(event, null, 2)
    );

    const payload = {
      name: event.name,
      description: event.description,
      price: packagePrice + characterTotal,
      startDate: event.startDate, // Đã gộp sẵn giờ + ngày
      endDate: event.endDate,
      location: event.location,
      serviceId: event.serviceId,
      packageId: selectedPackage,
      range: event.range || "15000-16000",
      listUpdateRequestCharacters: event.charactersListResponse.map((char) => ({
        requestCharacterId: char.requestCharacterId,
        characterId: char.characterId,
        cosplayerId: null,
        description: "shared",
        quantity: char.quantity || 1,
        listUpdateRequestDates: (char.requestDateResponses || []).map(
          (date) => ({
            requestDateId: date.requestDateId || null,
            startDate: date.startDate,
            endDate: date.endDate,
          })
        ),
      })),
    };

    console.log("📤 Payload to send:", JSON.stringify(payload, null, 2));
    return payload;
  };

  const handlePackageChange = (val) => {
    setSelectedPackage(val);
    const found = packages.find((p) => p.value === val);
    setSelectedPackageData(found || null);
  };

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
                <View style={{ zIndex: 1000 }}>
                  <DropDownPicker
                    open={open}
                    value={selectedPackage}
                    items={packages}
                    setOpen={setOpen}
                    setValue={handlePackageChange}
                    onChangeValue={handlePackageChange}
                    setItems={setPackages}
                    placeholder="Select a package"
                    listMode="MODAL"
                    style={{ marginBottom: open ? 200 : 10 }}
                  />
                </View>
              </Card.Content>
            </Card>

            {/* Characters */}
            <Card style={styles.card}>
              <Card.Title
                title="👥 Characters"
                titleStyle={styles.sectionTitle}
              />
              <Card.Content>
                {characters.map((c, index) => (
                  <View key={index} style={styles.characterRow}>
                    <Text style={styles.charText}>
                      <Text style={styles.label}>🎭 Character Name:</Text>{" "}
                      {c.name}
                    </Text>
                    <Text style={styles.charText}>
                      <Text style={styles.label}>💰 Price:</Text>{" "}
                      {c.price.toLocaleString()} VND
                    </Text>
                    <Text style={styles.charText}>
                      <Text style={styles.label}>🔢 Quantity:</Text>{" "}
                      {c.quantity}
                    </Text>
                    {c?.description ? (
                      <Text style={styles.charText}>
                        <Text style={styles.label}>📝 Description:</Text>{" "}
                        {c.description}
                      </Text>
                    ) : null}
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
              <Card.Title
                title="📋 Event Info"
                titleStyle={styles.sectionTitle}
              />
              <Card.Content>
                <Text style={styles.detailItem}>
                  📍 Location: {event?.location}
                </Text>
                <Text style={styles.detailItem}>
                  📅 Start Date: {event?.startDate}
                </Text>
                <Text style={styles.detailItem}>
                  📅 End Date: {event?.endDate}
                </Text>
                <Text style={styles.detailItem}>
                  🧾 Deposit: {event?.deposit || 0}%
                </Text>
                <Text style={styles.detailItem}>
                  🕒 Total Date: {event?.totalDate}
                </Text>
                <Text style={styles.detailItem}>
                  💰 Unit Price Range: {event?.range || "N/A"}
                </Text>
                <Text style={styles.detailItem}>
                  💵 Total Price: {totalPrice.toLocaleString()} VND
                </Text>
              </Card.Content>
            </Card>

            {/* Character Detail */}
            <Text style={styles.subHeader}>🔍 Character Details</Text>
            {characters.map((char, idx) => (
              <CharacterDetailsItem
                key={idx}
                character={{
                  name: char.name,
                  quantity: char.quantity,
                  description: char.description,
                  maxHeight: char.maxHeight,
                  maxWeight: char.maxWeight,
                  minHeight: char.minHeight,
                  minWeight: char.minWeight,
                  status: char.status,
                  image: char.image,
                }}
              />
            ))}

            {/* Footer */}
            <View style={styles.footer}>
              <Button
                mode="outlined"
                onPress={onClose}
                style={styles.footerBtn}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={async () => {
                  const payload = prepareEditRequestPayloadFromEvent(event);

                  try {
                    const res =
                      await DetailEventOrganizationPageService.updateEventOrganizationRequest(
                        event.requestId,
                        payload
                      );

                    alert("Cập nhật yêu cầu thành công!");
                    onClose();
                  } catch (error) {
                    console.error("Lỗi khi cập nhật:", error);
                    alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                  }
                }}
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
