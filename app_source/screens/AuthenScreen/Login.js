import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./LoginStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === "admin" && password === "123") {
      navigation.navigate("MainDrawer");
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <LinearGradient
      colors={["#3a1c71", "#d76d77", "#ffaf7b"]}
      style={styles.gradientBg}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.leftPanel}>
              <Text style={styles.panelTitle}>
                Join the {"\n"}
                <Text style={styles.textAccent}>
                  Cosplay Companion {"\n"}Service System
                </Text>
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Sign in</Text>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Text>{isPasswordVisible ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Forgot Password",
                    "Redirecting to password recovery..."
                  )
                }
              >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleLogin}
              >
                <Text style={styles.signInButtonText}>Login In →</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>or continue with</Text>
              <TouchableOpacity
                style={styles.googleButton}
                onPress={() =>
                  Alert.alert(
                    "Google Sign In",
                    "Redirecting to Google authentication..."
                  )
                }
              >
                <Image
                  source={{ uri: "https://www.google.com/favicon.ico" }}
                  style={styles.googleLogo}
                  resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.signUpText}>
                  Don't have an account?{" "}
                  <Text style={styles.signUpLink}>SIGN UP</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;
