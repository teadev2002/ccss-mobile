import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function RentalRequestDetailScreen({ route }) {
  const navigation = useNavigation();
  const [rentalData, setRentalData] = useState(route.params.rentalData);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedRentalData) {
        setRentalData(route.params.updatedRentalData);
      }
    }, [route.params?.updatedRentalData])
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FBBF24";
      case "Browsed":
        return "#3B82F6";
      case "Cancel":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Gradient and Go Back Button */}
      <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        style={styles.headerContainer}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.header}>🎭 Costume Rental Details</Text>
      </LinearGradient>

      {/* Overview Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={20} color="#4F46E5" />
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{rentalData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="chatbubble-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{rentalData.description || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(rentalData.status) }]}>
              <Text style={styles.statusText}>{rentalData.status}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{Number(rentalData.price).toLocaleString()} VND</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Deposit:</Text>
            <Text style={styles.value}>{Number(rentalData.deposit).toLocaleString()} VND</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>{rentalData.startDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Return Date:</Text>
            <Text style={styles.value}>{rentalData.endDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#4F46E5" />
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{rentalData.location}</Text>
          </View>
        </View>
      </View>

      {/* Costumes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Characters</Text>
        {(rentalData.charactersListResponse || []).map((character, index) => (
          <TouchableOpacity key={index} style={styles.costumeCard} activeOpacity={0.9}>
            <View style={styles.costumeHeader}>
              {character.characterImages?.[0]?.urlImage ? (
                <Image
                  source={{ uri: character.characterImages[0].urlImage }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={40} color="#6B7280" />
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              <View style={styles.costumeInfoContainer}>
                <Text style={styles.costumeName}>{character.characterName}</Text>
                <Text style={styles.costumeDescription} numberOfLines={2}>
                  {character.description || "No description available"}
                </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Qty: {character.quantity}</Text>
                </View>
              </View>
            </View>
            <View style={styles.costumeDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="resize-outline" size={16} color="#6B7280" />
                <Text style={styles.detailText}>
                  Height: {character.minHeight} - {character.maxHeight} cm
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="barbell-outline" size={16} color="#6B7280" />
                <Text style={styles.detailText}>
                  Weight: {character.minWeight} - {character.maxWeight} kg
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 20,
    paddingTop: 50, // Tăng paddingTop để chứa nút Go Back
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
    marginLeft: 8,
    flex: 0.3,
  },
  value: {
    fontSize: 16,
    color: "#1F2937",
    flex: 0.7,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  costumeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  costumeHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 100,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },
  costumeInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  costumeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
  },
  costumeDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#10B981",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  costumeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 5,
  },
});