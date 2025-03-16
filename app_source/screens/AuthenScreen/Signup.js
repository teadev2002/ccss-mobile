import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import styles from "./SignupStyles";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false); // New confirmation modal
  const [showVerifyModal, setShowVerifyModal] = useState(false); // Renamed for clarity
  const [code, setCode] = useState("");
  const [modalError, setModalError] = useState("");
  const navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.birthday) newErrors.birthday = "Birthday is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\+?\d{10,}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid (e.g., +1234567890).";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Show confirmation modal instead of proceeding directly
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    // Simulate API call (replace with your actual API logic)
    const mockResponse = Math.random() > 0.2 ? "success" : "email_exists";
    if (mockResponse === "email_exists") {
      Toast.show({
        type: "error",
        text1: "Email Already Exists",
        text2: "Please use a different email.",
        position: "top",
      });
    } else {
      setShowVerifyModal(true);
      Toast.show({
        type: "info",
        text1: "Check Your Email",
        text2: "Enter the verification code sent to your email.",
        position: "top",
      });
    }
  };

  const handleVerify = () => {
    if (!code.trim()) {
      setModalError("Verification code is required.");
      return;
    }

    // Simulate verification (replace with your API call)
    const mockVerify = Math.random() > 0.1 ? "success" : "fail";
    if (mockVerify === "success") {
      Toast.show({
        type: "success",
        text1: "Sign Up Successful",
        text2: "Redirecting to login...",
        position: "top",
      });
      setShowVerifyModal(false);
      setTimeout(() => navigation.navigate("Login"), 2000);
    } else {
      setModalError("Invalid code. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={["#3a1c71", "#d76d77", "#ffaf7b"]}
      style={styles.gradientBg}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Left Panel */}
          <View style={styles.leftPanel}>
            <View style={styles.welcomeBadge}>
              <Feather name="user" size={18} color="#fff" />
              <Text style={styles.welcomeText}>Create Your Account</Text>
            </View>
            <Text style={styles.panelTitle}>
              Join the Cosplay{"\n"}
              <Text style={styles.textAccent}>Community Today</Text>
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>SIGN UP</Text>

            {Object.keys(errors).length > 0 && (
              <View style={styles.errorContainer}>
                {Object.values(errors).map((error, index) => (
                  <Text key={index} style={styles.errorText}>
                    {error}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.inputWithIcon}>
              <Feather name="user" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            </View>

            <View style={styles.inputWithIcon}>
              <Feather name="mail" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
              />
            </View>

            <View style={styles.inputWithIcon}>
              <Feather name="lock" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
            </View>

            <View style={styles.inputWithIcon}>
              <Feather name="lock" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
              />
            </View>

            <View style={styles.inputWithIcon}>
              <Feather name="calendar" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Birthday (YYYY-MM-DD)"
                placeholderTextColor="#999"
                value={formData.birthday}
                onChangeText={(text) => handleInputChange("birthday", text)}
              />
            </View>

            <View style={styles.inputWithIcon}>
              <Feather name="phone" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
              />
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
              <Feather name="arrow-right" size={18} color="#fff" />
            </TouchableOpacity>

            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separatorLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => Alert.alert("Google Sign Up", "Coming soon!")}
            >
              <Feather name="globe" size={20} color="#000" />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginLink}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal visible={showConfirmModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Your Details</Text>
            <Text style={styles.modalDetailText}>Name: {formData.name}</Text>
            <Text style={styles.modalDetailText}>Email: {formData.email}</Text>
            <Text style={styles.modalDetailText}>
              Birthday: {formData.birthday}
            </Text>
            <Text style={styles.modalDetailText}>Phone: {formData.phone}</Text>
            <Text style={styles.modalNoteText}>
              Please review your details. Passwords are hidden for security.
            </Text>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleConfirmSubmit}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowConfirmModal(false)}
            >
              <Text style={styles.cancelButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Verification Modal */}
      <Modal visible={showVerifyModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verify Your Signup</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter verification code"
              placeholderTextColor="#999"
              value={code}
              onChangeText={setCode}
            />
            {modalError ? (
              <Text style={styles.modalErrorText}>{modalError}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowVerifyModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default Signup;
