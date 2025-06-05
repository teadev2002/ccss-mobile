import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "../style/RentalModalStyle";
import { useContext, useEffect, useState } from "react";
import LocationPickerService from "../../../apiServices/LocationService/LocationPickerService";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../../assets/context/AuthContext";
import RequestService from "../../../apiServices/requestService/requestService";

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const today = new Date();
const minStartDate = new Date(today);
minStartDate.setHours(0, 0, 0, 0);
minStartDate.setDate(today.getDate() + 4);

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const RentalModal = ({
  modalVisible,
  setModalVisible,
  rentalForm,
  setRentalForm,
  selectedCharacters,
}) => {
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [termsVisible, setTermsVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [characterQuantities, setCharacterQuantities] = useState({});

  useEffect(() => {
    if (modalVisible) {
      setRentalForm({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        district: "",
        ward: "",
        street: "",
        agreeTerms: false,
      });
      const initialQuantities = selectedCharacters.reduce((acc, char) => ({
        ...acc,
        [char.characterId]: "1",
      }), {});
      setCharacterQuantities(initialQuantities);
      LocationPickerService.getDistricts().then((res) => setDistricts(res));
    }
  }, [modalVisible, selectedCharacters]);

  useEffect(() => {
    if (rentalForm.district) {
      LocationPickerService.getStreets(rentalForm.district).then((res) =>
        setWards(res)
      );
    }
  }, [rentalForm.district]);

  const handleConfirmStartDate = (date) => {
    setRentalForm({
      ...rentalForm,
      startDate: formatDate(date),
    });
    setStartDatePickerVisible(false);
  };

  const handleConfirmEndDate = (date) => {
    const startDate = rentalForm.startDate ? parseDate(rentalForm.startDate) : null;
    const endDate = new Date(date);
    endDate.setHours(0, 0, 0, 0);

    if (startDate && endDate <= startDate) {
      Toast.show({
        type: "error",
        text1: "Invalid End Date",
        text2: "End date must be at least one day after start date.",
        position: "top",
      });
      return;
    }

    setRentalForm({
      ...rentalForm,
      endDate: formatDate(date),
    });
    setEndDatePickerVisible(false);
  };

  const calculateTotalDays = () => {
    if (!rentalForm.startDate || !rentalForm.endDate) {
      return 1;
    }
    const start = parseDate(rentalForm.startDate);
    const end = parseDate(rentalForm.endDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  };

  const calculateDeposit = () => {
    if (!rentalForm.startDate || !rentalForm.endDate) {
      return 0;
    }
    const totalDays = calculateTotalDays() ;
    return selectedCharacters.reduce((sum, char) => {
      const unitPrice = char.price || 0;
      const quantity = parseInt(characterQuantities[char.characterId] || "1");
      return sum + (unitPrice * (totalDays+ 1)  + unitPrice * 5) * quantity;
    }, 0);
  };

  const calculateTotalPrice = () => {
    const totalDays = calculateTotalDays();
    return selectedCharacters.reduce((sum, char) => {
      const unitPrice = char.price || 0;
      const quantity = parseInt(characterQuantities[char.characterId] || "1");
      return sum + unitPrice * quantity * (totalDays + 1);
    }, 0);
  };

  const handleQuantityChange = (characterId, value) => {
    let num = parseInt(value);
    if (isNaN(num)) {
      Toast.show({
        type: "info",
        text1: "Invalid quantity",
        text2: "Please enter a number between 1 and 10.",
        position: "top",
      });
      num = 1;
    } else if (num > 10) {
      Toast.show({
        type: "info",
        text1: "Maximum limit reached",
        text2: "You can rent up to 10 costumes only.",
        position: "bottom",
      });
      num = 10;
    } else if (num < 1) {
      Toast.show({
        type: "info",
        text1: "Minimum quantity is 1",
        text2: "You must rent at least 1 costume.",
        position: "bottom",
      });
      num = 1;
    }

    setCharacterQuantities({
      ...characterQuantities,
      [characterId]: num.toString(),
    });
  };

  const handleSubmitRental = async () => {
    if (!rentalForm.agreeTerms) {
      Toast.show({
        type: "info",
        text1: "Terms not agreed",
        text2: "Please agree to the compensation terms.",
        position: "top",
      });
      return;
    }

    if (
      !rentalForm.name ||
      !rentalForm.startDate ||
      !rentalForm.endDate ||
      !rentalForm.district ||
      !rentalForm.ward ||
      !rentalForm.street
    ) {
      Toast.show({
        type: "error",
        text1: "Missing information",
        text2: "Please fill in all required fields.",
        position: "top",
      });
      return;
    }

    const payload = {
      accountId: user?.id || "",
      name: rentalForm.name,
      description: rentalForm.description || "shared",
      price: calculateTotalPrice(),
      startDate: rentalForm.startDate,
      endDate: rentalForm.endDate,
      location: `${rentalForm.street}, ${
        wards.find((w) => w.id === rentalForm.ward)?.name || ""
      }, ${
        districts.find((d) => d.id === rentalForm.district)?.name || ""
      }, Hồ Chí Minh`,
      deposit: calculateDeposit().toString(),
      serviceId: "S001",
      packageId: null,
      listRequestCharacters: selectedCharacters.map((char) => ({
        characterId: char.characterId || "",
        description: rentalForm.description || "shared",
        quantity: parseInt(characterQuantities[char.characterId] || "1"),
      })),
    };

    try {
      setIsLoading(true);
      await RequestService.createRentalRequest(payload);
      setModalVisible(false);
      Alert.alert(
        "🎉 Rental Successful",
        "Your costumes have been rented successfully. We will contact you soon.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Rental request failed:", error);
      Alert.alert(
        "❌ Rental Failed",
        "Something went wrong while trying to rent the costumes. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitle}>Confirm Your Request</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Name"
                value={rentalForm.name}
                onChangeText={(text) =>
                  setRentalForm({ ...rentalForm, name: text })
                }
              />

              <TextInput
                style={[styles.modalInput, { height: 80 }]}
                placeholder="Description"
                multiline
                value={rentalForm.description}
                onChangeText={(text) =>
                  setRentalForm({ ...rentalForm, description: text })
                }
              />

              <Text style={styles.label}>Start Date:</Text>
              <TouchableOpacity
                style={styles.modalInput}
                onPress={() => setStartDatePickerVisible(true)}
              >
                <Text>
                  {rentalForm.startDate || "Select start date (DD/MM/YYYY)"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Return Date:</Text>
              <TouchableOpacity
                style={styles.modalInput}
                onPress={() => setEndDatePickerVisible(true)}
              >
                <Text>
                  {rentalForm.endDate || "Select return date (DD/MM/YYYY)"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Location: Hồ Chí Minh City</Text>
              <Text style={styles.label}>District:</Text>
              <RNPickerSelect
                onValueChange={(value) =>
                  setRentalForm({ ...rentalForm, district: value, ward: "" })
                }
                items={districts.map((d) => ({
                  label: d.name || "Unknown",
                  value: d.id,
                  key: d.id,
                }))}
                value={rentalForm.district}
                placeholder={{ label: "Select a district", value: null }}
                style={{
                  inputIOS: styles.modalInput,
                  inputAndroid: styles.modalInput,
                }}
              />

              <Text style={styles.label}>Ward:</Text>
              <RNPickerSelect
                onValueChange={(value) =>
                  setRentalForm({ ...rentalForm, ward: value })
                }
                items={wards.map((w) => ({
                  label: w.name || "Unknown",
                  value: w.id,
                  key: w.id,
                }))}
                value={rentalForm.ward}
                placeholder={{ label: "Select a ward", value: null }}
                disabled={!rentalForm.district}
                style={{
                  inputIOS: styles.modalInput,
                  inputAndroid: styles.modalInput,
                }}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Street Address"
                value={rentalForm.street}
                onChangeText={(text) =>
                  setRentalForm({ ...rentalForm, street: text })
                }
              />

              <Text style={styles.label}>Selected Costumes:</Text>
              {selectedCharacters.map((char) => (
                <View key={char.characterId} style={styles.characterContainer}>
                  <Text style={styles.label}>
                    Costume: {char.characterName || "Unknown"}
                  </Text>
                  <Text style={styles.label}>
                    Unit Price: {(char.price || 0).toLocaleString()} VND
                  </Text>
                  <Text style={styles.label}>Quantity:</Text>
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        const currentQty = parseInt(characterQuantities[char.characterId] || "1");
                        if (currentQty <= 1) {
                          Toast.show({
                            type: "info",
                            text1: "Minimum quantity is 1",
                            text2: "You must rent at least 1 costume.",
                            position: "top",
                          });
                          return;
                        }
                        handleQuantityChange(char.characterId, (currentQty - 1).toString());
                      }}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.modalInput, styles.quantityInput]}
                      keyboardType="numeric"
                      value={characterQuantities[char.characterId]?.toString() || "1"}
                      onChangeText={(text) => handleQuantityChange(char.characterId, text)}
                    />
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        const currentQty = parseInt(characterQuantities[char.characterId] || "1");
                        const maxQty = Math.min(char.quantity || 10, 10); // Respect character stock
                        if (currentQty >= maxQty) {
                          Toast.show({
                            type: "info",
                            text1: "Maximum limit reached",
                            text2: `Only ${maxQty} available for ${char.characterName || "this costume"}.`,
                            position: "bottom",
                          });
                          return;
                        }
                        handleQuantityChange(char.characterId, (currentQty + 1).toString());
                      }}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.label}>
                    Total for {char.characterName || "Unknown"}: {(
                      (char.price || 0) * parseInt(characterQuantities[char.characterId] || "1") * calculateTotalDays()
                    ).toLocaleString()} VND
                  </Text>
                </View>
              ))}

              <Text style={styles.label}>
                Total Price: {calculateTotalPrice().toLocaleString()} VND
              </Text>
              <Text style={styles.label}>
                Deposit: {calculateDeposit().toLocaleString()} VND
              </Text>

              <View style={styles.termsRow}>
                <TouchableOpacity
                  onPress={() =>
                    setRentalForm({
                      ...rentalForm,
                      agreeTerms: !rentalForm.agreeTerms,
                    })
                  }
                  style={[
                    styles.checkbox,
                    rentalForm.agreeTerms && { backgroundColor: "#22668a" },
                  ]}
                />
                <Text style={styles.termsText}>
                  I agree to the{" "}
                  <Text
                    style={{
                      color: "#22668a",
                      textDecorationLine: "underline",
                    }}
                    onPress={() => setTermsVisible(true)}
                  >
                    compensation terms
                  </Text>
                </Text>
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalSubmitButton,
                    !rentalForm.agreeTerms && { backgroundColor: "#ccc" },
                  ]}
                  disabled={!rentalForm.agreeTerms || isLoading}
                  onPress={handleSubmitRental}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.modalButtonText}>Confirm Request</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        display="calendar"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDatePickerVisible(false)}
        minimumDate={minStartDate}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        display="calendar"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDatePickerVisible(false)}
        minimumDate={
          rentalForm.startDate
              ? (() => {
                  const start = parseDate(rentalForm.startDate);
                  const min = new Date(start);
                  min.setDate(start.getDate() + 1); // At least 1 day after start
                  return min;
                })()
              : minStartDate
        }
        maximumDate={
          rentalForm.startDate
            ? (() => {
                const start = parseDate(rentalForm.startDate);
                const max = new Date(start);
                max.setDate(start.getDate() + 14);
                return max;
              })()
            : null
        }
      />

      <Modal
        visible={termsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTermsVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Compensation Terms
            </Text>
            <ScrollView style={{ maxHeight: 300 }}>
              <Text style={{ fontSize: 14, lineHeight: 20 }}>
                - You are responsible for returning the costume in good
                condition.{"\n"}- Any damages or loss will result in
                compensation fees.{"\n"}- The rental duration cannot exceed 14
                days.{"\n"}- Late return may result in additional charges.{"\n"}
                - Contact our support team in case of special circumstances.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#22668a",
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
              }}
              onPress={() => setTermsVisible(false)}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default RentalModal;