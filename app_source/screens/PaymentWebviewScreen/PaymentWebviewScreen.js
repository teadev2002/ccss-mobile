import React, { useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PaymentWebviewScreen = ({ route }) => {
  const { paymentUrl, paymentContext } = route.params;
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    console.log("WebView URL:", url);

    if (url.includes("payment-success")) {
      navigation.replace("PaymentSuccess", { paymentContext });
    } else if (url.includes("payment-failed")) {
      navigation.replace("PaymentFailed", { paymentContext });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Cancel Payment?",
              "Are you sure you want to cancel this payment?",
              [
                { text: "No", style: "cancel" },
                {
                  text: "Yes, Cancel",
                  onPress: () =>
                    navigation.replace("PaymentFailed", { paymentContext }),
                },
              ],
              { cancelable: true }
            );
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={() => true}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        startInLoadingState={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4a90e2" />
          <Text style={styles.loadingText}>Processing your payment...</Text>
        </View>
      )}
    </View>
  );
};

export default PaymentWebviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
});
