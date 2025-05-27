import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/UserInfoStyle";
import LocationPickerService from './../../../apiServices/LocationService/LocationPickerService';

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

  const vietnamPhoneRegex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;

  useEffect(() => {
  const fetchProvinces = async () => {
    try {
      const res = await LocationPickerService.getAllProvinces();
      console.log("Provinces:", JSON.stringify(res, null, 2));
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

    if (!phone) newErrors.phone = "Phone is required.";
    else if (!vietnamPhoneRegex.test(phone)) newErrors.phone = "Invalid Vietnamese phone number.";

    if (!address) newErrors.address = "Address is required.";
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
          <Text style={styles.modalTitle}>Enter Shipping Info</Text>

          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setErrors((e) => ({ ...e, phone: null }));
            }}
            style={styles.input}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setErrors((e) => ({ ...e, address: null }));
            }}
            style={styles.input}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />

          <Text style={styles.label}>Province/City</Text>
          <Picker
            selectedValue={selectedProvince}
            onValueChange={(value) => {
              setSelectedProvince(value);
              setErrors((e) => ({ ...e, province: null }));
            }}
          >
            <Picker.Item label="Select Province" value="" />
            {provinces.map((p) => (
              <Picker.Item key={p.id} label={p.name} value={p.id} />
            ))}
          </Picker>
          {errors.province && <Text style={styles.errorText}>{errors.province}</Text>}

          <Text style={styles.label}>District</Text>
          <Picker
            selectedValue={selectedDistrict}
            onValueChange={(value) => {
              setSelectedDistrict(value);
              setErrors((e) => ({ ...e, district: null }));
            }}
            enabled={districts.length > 0}
          >
            <Picker.Item label="Select District" value="" />
            {districts.map((d) => (
              <Picker.Item key={d.id} label={d.name} value={d.id} />
            ))}
          </Picker>
          {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

          <Text style={styles.label}>Ward</Text>
          <Picker
            selectedValue={selectedWard}
            onValueChange={(value) => {
              setSelectedWard(value);
              setErrors((e) => ({ ...e, ward: null }));
            }}
            enabled={wards.length > 0}
          >
            <Picker.Item label="Select Ward" value="" />
            {wards.map((w) => (
              <Picker.Item key={w.id} label={w.name} value={w.id} />
            ))}
          </Picker>
          {errors.ward && <Text style={styles.errorText}>{errors.ward}</Text>}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default UserInfoModal;
