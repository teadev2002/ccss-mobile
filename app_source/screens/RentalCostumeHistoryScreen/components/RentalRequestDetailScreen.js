import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function RentalRequestDetailScreen({ route }) {
  const [rentalData, setRentalData] = useState(route.params.rentalData);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedRentalData) {
        setRentalData(route.params.updatedRentalData);
      }
    }, [route.params?.updatedRentalData])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎭 Rental Request Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>📌 Name:</Text>
        <Text style={styles.value}>{rentalData.name}</Text>

        <Text style={styles.label}>📝 Description:</Text>
        <Text style={styles.value}>{rentalData.description}</Text>

        <Text style={styles.label}>📋 Status:</Text>
        <Text style={styles.value}>{rentalData.status}</Text>

        <Text style={styles.label}>💰 Price:</Text>
        <Text style={styles.value}>{Number(rentalData.price).toLocaleString()} VND</Text>

        <Text style={styles.label}>🔒 Deposit:</Text>
        <Text style={styles.value}>{Number(rentalData.deposit).toLocaleString()} VND</Text>

        <Text style={styles.label}>📅 Start Date:</Text>
        <Text style={styles.value}>{rentalData.startDate}</Text>

        <Text style={styles.label}>📦 Return Date:</Text>
        <Text style={styles.value}>{rentalData.endDate}</Text>

        <Text style={styles.label}>📍 Location:</Text>
        <Text style={styles.value}>{rentalData.location}</Text>
      </View>

      <Text style={styles.subHeader}>👗 Costumes</Text>
      {(rentalData.charactersListResponse || []).map((character, index) => (
        <View key={index} style={styles.costumeCard}>
          <View style={styles.costumeHeader}>
            <Text style={styles.costumeName}>{character.characterName}</Text>
            {character.characterImages?.[0]?.urlImage && (
              <Image
                source={{ uri: character.characterImages[0].urlImage }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </View>

          <Text style={styles.costumeInfo}>📝 {character.description}</Text>
          <Text style={styles.costumeInfo}>📦 Quantity: {character.quantity}</Text>
          <Text style={styles.costumeInfo}>📏 Height: {character.minHeight} - {character.maxHeight} cm</Text>
          <Text style={styles.costumeInfo}>⚖️ Weight: {character.minWeight} - {character.maxWeight} kg</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "#444",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#555",
  },
  value: {
    marginBottom: 8,
    color: "#333",
  },
  costumeCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  costumeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  costumeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  image: {
    width: 80,
    height: 100,
    marginLeft: 10,
    borderRadius: 8,
  },
  costumeInfo: {
    color: "#444",
    marginBottom: 4,
  },
});
