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
minStartDate.setHours(0, 0, 0, 0); // clear time
minStartDate.setDate(today.getDate() + 4); // +4 days from today

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const RentalModal = ({
  modalVisible,
  setModalVisible,
  rentalForm,
  setRentalForm,
  selectedCharacter,
}) => {
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [termsVisible, setTermsVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const calculateDeposit = () => {
    if (
      !selectedCharacter?.price ||
      !rentalForm.startDate ||
      !rentalForm.endDate
    ) {
      return 0;
    }

    const start = parseDate(rentalForm.startDate);
    const end = parseDate(rentalForm.endDate);
    const quantity = parseInt(rentalForm.quantity || "1");

    // Tính số ngày (tối thiểu 1)
    const totalDays = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );

    const unitPrice = selectedCharacter.price;

    const deposit = (unitPrice * totalDays + unitPrice * 5) * quantity;
    return deposit;
  };
  useEffect(() => {
    if (modalVisible) {
      LocationPickerService.getDistricts().then((res) => setDistricts(res)); // 👈 CHỈ set res.data
    }
  }, [modalVisible]);

  useEffect(() => {
    if (rentalForm.district) {
      LocationPickerService.getStreets(rentalForm.district).then((res) =>
        setWards(res)
      ); // 👈 Tương tự, lấy `res.data`
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
    setRentalForm({
      ...rentalForm,
      endDate: formatDate(date),
    });
    setEndDatePickerVisible(false);
  };

  const handleSubmitRental = async ({
    rentalForm,
    selectedCharacter,
    districts,
    wards,
    setModalVisible,
  }) => {
    if (!rentalForm.agreeTerms) return;

    const payload = {
      accountId: user?.id,
      name: rentalForm.name,
      description: rentalForm.description,
      price: selectedCharacter?.price * parseInt(rentalForm.quantity || "1"),
      startDate: rentalForm.startDate,
      endDate: rentalForm.endDate,
      location: `Hồ Chí Minh, ${
        districts.find((d) => d.id === rentalForm.district)?.name || ""
      }, ${wards.find((w) => w.id === rentalForm.ward)?.name || ""}, ${
        rentalForm.street
      }`,
      deposit: calculateDeposit().toString(),
      listRequestCharacters: [
        {
          characterId: selectedCharacter?.characterId,
          description: rentalForm.description,
          quantity: parseInt(rentalForm.quantity || "1"),
        },
      ],
    };
    try {
      setIsLoading(true);
      await RequestService.createRentalRequest(payload);
      setModalVisible(false);
      Alert.alert(
        "🎉 Rental Successful",
        "Your costume has been rented successfully. We will contact you soon.",
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        {
          cancelable: true,
        }
      );
    } catch (error) {
      console.error("Rental request failed:", error);
      Alert.alert(
        "❌ Rental Failed",
        "Something went wrong while trying to rent the costume. Please try again.",
        [
          {
            text: "OK",
            style: "destructive", // đỏ trên iOS, đậm hơn trên Android
          },
        ]
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
                placeholder="Enter your height and weight"
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

              {/* End Date */}
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
                  label: d.name,
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
                  label: w.name,
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

              <Text style={styles.label}>
                Costume: {selectedCharacter?.characterName}
              </Text>
              <Text style={styles.label}>
                Unit Price: {selectedCharacter?.price?.toLocaleString()} VND
              </Text>
              <Text style={styles.label}>
                Total:{" "}
                {(
                  selectedCharacter?.price * parseInt(rentalForm.quantity || 0)
                ).toLocaleString()}{" "}
                VND
              </Text>

              <Text style={styles.label}>
                Deposit: {calculateDeposit().toLocaleString()} VND {"\n"}
              </Text>

              <Text style={styles.label}>Quantity:</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    const currentQty = parseInt(rentalForm.quantity || "1");
                    if (currentQty <= 1) {
                      Toast.show({
                        type: "info",
                        text1: "Minimum quantity is 1",
                        text2: "You must rent at least 1 costume.",
                        position: "top",
                      });
                      return;
                    }
                    const newQty = currentQty - 1;
                    setRentalForm({
                      ...rentalForm,
                      quantity: newQty.toString(),
                    });
                  }}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <TextInput
                  style={[styles.modalInput, styles.quantityInput]}
                  keyboardType="numeric"
                  value={rentalForm.quantity?.toString()}
                  onChangeText={(text) => {
                    let num = parseInt(text);
                    if (isNaN(num)) {
                      Toast.show({
                        type: "info",
                        text1: "Invalid quantity",
                        text2: "Please enter a number between 1 and 10.",
                        position: "top",
                      });
                      setRentalForm({ ...rentalForm, quantity: "1" });
                      return;
                    }

                    if (num > 10) {
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

                    setRentalForm({
                      ...rentalForm,
                      quantity: num.toString(),
                    });
                  }}
                />

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    const currentQty = parseInt(rentalForm.quantity || "1");
                    if (currentQty >= 10) {
                      Toast.show({
                        type: "info",
                        text1: "Maximum limit reached",
                        text2: "Sorry, you can't rent more than 10 costumes.",
                        position: "bottom",
                      });
                      return;
                    }
                    const newQty = currentQty + 1;
                    setRentalForm({
                      ...rentalForm,
                      quantity: newQty.toString(),
                    });
                  }}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

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
                  onPress={() =>
                    handleSubmitRental({
                      rentalForm,
                      selectedCharacter,
                      districts,
                      wards,
                      setModalVisible,
                    })
                  }
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

      {/* Start Date Picker */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        display="calendar"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDatePickerVisible(false)}
        minimumDate={minStartDate}
      />

      {/* End Date Picker */}
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        display="calendar"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDatePickerVisible(false)}
        minimumDate={
          rentalForm.startDate ? parseDate(rentalForm.startDate) : minStartDate
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
