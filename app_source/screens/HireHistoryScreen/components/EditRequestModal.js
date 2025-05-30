import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";
import CharacterService from "../../../apiServices/characterService/CharacterService";

const EditRequestModal = ({
  data,
  setData,
  onCancel,
  onSave,
  characters,
  localChanges,
  cosplayers,
  onChangeCosplayer,
}) => {
  const { charactersList } = data;

  console.log("data", data);

  // console.log("data", JSON.stringify(data, null, 2));
  const calculateCharacterTotal = (char) => {
    const cosplayer = cosplayers[char.cosplayerId];
    const character = characters[char.characterId];
    if (!cosplayer || !character) return 0;

    const hourlyRate = cosplayer.salaryIndex || 0;

    // Tính tổng giờ từ requestDateResponses
    const totalHour =
      char.requestDateResponses?.reduce((sum, rd) => {
        return sum + (rd.totalHour || 0);
      }, 0) || 0;

    // Đếm số ngày unique từ các startDate
    const uniqueDays = new Set(
      char.requestDateResponses?.map((rd) => {
        const dateOnly = rd.startDate?.split(" ")[1]; // "01/06/2025"
        return dateOnly;
      })
    );
    const totalDay = uniqueDays.size || 1;

    const characterPrice = character.price || 0;

    return totalHour * hourlyRate + characterPrice * totalDay;
  };

  const totalPrice = charactersList.reduce((sum, char) => {
    const effectiveCosplayerId =
      localChanges[char.characterId] ?? char.cosplayerId;
    const charWithUpdatedCosplayer = {
      ...char,
      cosplayerId: effectiveCosplayerId,
    };
    return sum + calculateCharacterTotal(charWithUpdatedCosplayer);
  }, 0);

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.modalTitle}>
            Edit Request for Hiring Cosplayer
          </Text>

          <Text style={styles.modalLabel}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            value={data.name}
            onChangeText={(text) => updateField("name", text)}
            style={styles.modalInput}
          />

          <Text style={styles.modalLabel}>Description</Text>
          <TextInput
            placeholder="Enter description"
            value={data.description}
            onChangeText={(text) => updateField("description", text)}
            style={[styles.modalInput, { height: 100 }]}
            multiline
          />

          <Text style={styles.modalLabel}>Location</Text>
          <TextInput
            placeholder="Enter location"
            value={data.location}
            onChangeText={(text) => updateField("location", text)}
            style={styles.modalInput}
          />

          <Text style={{ fontWeight: "bold", marginTop: 16 }}>
            List of Requested Characters (Total: {totalPrice.toLocaleString()}{" "}
            VND)
          </Text>

          <Text style={{ fontStyle: "italic", fontSize: 12, marginBottom: 10 }}>
            *Unit Price = (Total Hours × Hourly Rate) + (Character Price × Total
            Days)
          </Text>

          {charactersList.map((char, index) => {
            const effectiveCosplayerId =
              localChanges[char.characterId] ?? char.cosplayerId;
            const cosplayer = cosplayers[effectiveCosplayerId];
            const character = characters[char.characterId];
            const characterTotal = calculateCharacterTotal({
              ...char,
              cosplayerId: effectiveCosplayerId,
            });

            return (
              <View key={index} style={styles.characterBox}>
                <Text style={{ fontWeight: "bold" }}>
                  Cosplayer Name: {cosplayer?.name || "Unknown"}
                </Text>
                <Text>
                  Height: {cosplayer?.height}cm | Weight: {cosplayer?.weight}kg
                  | Hourly Rate: {cosplayer?.salaryIndex?.toLocaleString() || 0}{" "}
                  VND/h
                </Text>
                <Text>
                  Character: {character?.characterName || "Unknown"} | Price:{" "}
                  {character?.price?.toLocaleString() || 0} VND
                </Text>
                <Text>Quantity: {char.quantity || 1}</Text>
                <Text>
                  Description: {character.description || "No description"}
                </Text>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Price: {character.price.toLocaleString()} VND
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    mode="outlined"
                    onPress={() => {
                      onChangeCosplayer({
                        data,
                        char,
                        characterId: char.characterId,
                        currentCosplayerId: char.cosplayerId,
                        requestDateResponses: char.requestDateResponses,
                        requestCharacterId: char.requestCharacterId,
                        description: char.description,
                        quantity: char.quantity,
                        onConfirm: (newCosplayerId) => {
                          setData((prevData) => ({
                            ...prevData,
                            charactersList: prevData.charactersList.map(
                              (item) =>
                                item.characterId === char.characterId
                                  ? { ...item, cosplayerId: newCosplayerId }
                                  : item
                            ),
                          }));
                        },
                      });
                    }}
                  >
                    Change Cosplayer
                  </Button>
                  <Button
                    mode="outlined"
                    textColor="red"
                    onPress={() => {
                      if (charactersList.length > 1) {
                        setData((prev) => ({
                          ...prev,
                          charactersList: prev.charactersList.filter(
                            (_, i) => i !== index
                          ),
                        }));
                      } else {
                        alert("You must have at least one character.");
                      }
                    }}
                  >
                    Delete
                  </Button>
                </View>
              </View>
            );
          })}

          {/* Optional: Request Dates dropdown here */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Button onPress={onCancel}>Cancel</Button>
            <Button
              mode="contained"
              onPress={() => {
                const firstChar = data.charactersList[0];
                const firstRequestDates = firstChar?.requestDateResponses || [];

                const rawStartDate = firstRequestDates[0]?.startDate || "";
                const rawEndDate =
                  firstRequestDates[firstRequestDates.length - 1]?.endDate ||
                  "";

                const startDate = rawStartDate.split(" ")[1] || "";
                const endDate = rawEndDate.split(" ")[1] || "";
                ("");

                const payload = {
                  name: data.name,
                  description: data.description,
                  price: totalPrice,
                  startDate: startDate,
                  endDate: endDate,
                  location: data.location,
                  serviceId: "S002",
                  packageId: null,
                  range: null,
                  listUpdateRequestCharacters: data.charactersList.map(
                    (char) => ({
                      requestCharacterId: char.requestCharacterId,
                      characterId: char.characterId,
                      cosplayerId:
                        localChanges[char.characterId] ?? char.cosplayerId,
                      description: char.description,
                      quantity: char.quantity,
                    })
                  ),
                };

                onSave(payload);
              }}
            >
              Save Changes
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditRequestModal;
