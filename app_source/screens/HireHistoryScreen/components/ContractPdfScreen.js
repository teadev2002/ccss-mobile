import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // hoặc dùng `react-native-vector-icons`

const ContractPdfScreen = ({ route }) => {
  const { url } = route.params;
  const navigation = useNavigation();

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#007bff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <WebView source={{ uri: viewerUrl }} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "500",
  },
});

export default ContractPdfScreen;
