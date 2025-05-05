import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef, useContext, useEffect } from "react";
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
import { AuthContext } from "../../../assets/context/AuthContext";
import AuthenService from "../../apiServices/authenService/AuthenService";
import styles from "./LoginStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef();
  const navigation = useNavigation();
  const { login, tokens } = useContext(AuthContext);

  useEffect(() => {
    if (tokens) {
      navigation.navigate("MainDrawer");
    }
  }, [tokens, navigation]);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Thông báo", "Email không hợp lệ.");
      return;
    }

    setIsLoading(true);
    try {
      const tokens = await AuthenService.login(email, password);
      await login(tokens); 
      navigation.navigate("MainDrawer");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Lỗi đăng nhập", error.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
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
                editable={!isLoading}
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
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                  disabled={isLoading}
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
                disabled={isLoading}
              >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.signInButton, isLoading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.signInButtonText}>
                  {isLoading ? "Logging in..." : "Login In →"}
                </Text>
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
                disabled={isLoading}
              >
                <Image
                  source={{ uri: "https://www.google.com/favicon.ico" }}
                  style={styles.googleLogo}
                  resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
                disabled={isLoading}
              >
                <Text style={styles.signUpText}>
                  Don't have an account?{" "}
                  <Text style={styles.signUpLink}>SIGN UP </Text>
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
