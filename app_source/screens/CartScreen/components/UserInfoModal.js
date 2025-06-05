import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import LocationPickerService from "./../../../apiServices/LocationService/LocationPickerService";

const UserInfoModal = ({ visible, onClose, onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await LocationPickerService.getAllProvinces();
        setProvinces(res);
      } catch (error) {
        console.error("Fetch provinces error:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const res = await LocationPickerService.getAllDistricts(selectedProvince);
          setDistricts(res);
          setSelectedDistrict("");
          setWards([]);
        } catch {}
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const res = await LocationPickerService.getStreets(selectedDistrict);
          setWards(res);
          setSelectedWard("");
        } catch {}
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  const handleSubmit = () => {
    const newErrors = {};
    const vietnamPhoneRegex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;
    const addressRegex = /^[\p{L}\p{N}\s,.\-]{5,100}$/u;
    const descriptionRegex = /^[\p{L}0-9\s,.\-]{0,200}$/u;

    if (!phone) newErrors.phone = "Phone is required.";
    else if (!vietnamPhoneRegex.test(phone))
      newErrors.phone = "Invalid Vietnamese phone number.";

    if (!address) newErrors.address = "Address is required.";
    else if (!addressRegex.test(address))
      newErrors.address = "Address must be 5–100 valid characters.";

    if (!description) {
      newErrors.description = "Description is required.";
    } else if (!descriptionRegex.test(description)) {
      newErrors.description =
        "Description can be up to 200 characters without special characters.";
    }

    if (!selectedProvince) newErrors.province = "Province is required.";
    if (!selectedDistrict) newErrors.district = "District is required.";
    if (!selectedWard) newErrors.ward = "Ward is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      phone,
      address,
      description,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      wardId: selectedWard,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Shipping Information</Text>

          <Text style={styles.label}>Province/City</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedProvince}
              onValueChange={(value) => {
                setSelectedProvince(value);
                setErrors((e) => ({ ...e, province: null }));
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select Province" value="" />
              {provinces.map((p) => (
                <Picker.Item key={p.id} label={p.name} value={p.id} />
              ))}
            </Picker>
          </View>
          {errors.province && <Text style={styles.errorText}>{errors.province}</Text>}

          <Text style={styles.label}>District</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(value) => {
                setSelectedDistrict(value);
                setErrors((prev) => ({ ...prev, district: "" }));
              }}
              enabled={districts.length > 0}
              style={styles.picker}
            >
              <Picker.Item label="Select District" value="" />
              {districts.map((d) => (
                <Picker.Item key={d.id} label={d.name} value={d.id} />
              ))}
            </Picker>
          </View>
          {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

          <Text style={styles.label}>Ward</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedWard}
              onValueChange={(value) => {
                setSelectedWard(value);
                setErrors((prev) => ({ ...prev, ward: "" }));
              }}
              enabled={wards.length > 0}
              style={styles.picker}
            >
              <Picker.Item label="Select Ward" value="" />
              {wards.map((w) => (
                <Picker.Item key={w.id} label={w.name} value={w.id} />
              ))}
            </Picker>
          </View>
          {errors.ward && <Text style={styles.errorText}>{errors.ward}</Text>}

          <Text style={styles.label}>Detailed Address</Text>
          <TextInput
            placeholder="Enter detailed address (e.g., 123 Main St)"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
            style={styles.input}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter phone number (e.g., 0901234567)"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            style={styles.input}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            placeholder="Additional notes for delivery"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            style={[styles.input, { height: 80 }]}
            multiline
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#333",
  },
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  submitButton: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserInfoModal;