// components/hireHistory/CharacterCard.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";
import { useNavigation } from "@react-navigation/native";
import {
  calculateCosplayerCost,
  calculateTotalHours,
  calculateTotalDays,
} from "../../../utils/calculateCost";

const CharacterCard = ({
  char,
  cosplayer,
  character,
  COSPLAYER_STATUS,
  onChangeCosplayer,
}) => {
  const firstDate = char.requestDateResponses?.[0];
  const statusKey = char.status ?? 0;
  const statusInfo = COSPLAYER_STATUS[statusKey];
  const hasFeedback = !!char.userHasFeedback;
  const totalHour = calculateTotalHours(char.requestDateResponses);
  const salary = cosplayer?.salaryIndex || 0;
  const totalDays = calculateTotalDays(char.requestDateResponses);
  const characterPrice = character?.price || 0;
  const totalCost = calculateCosplayerCost(
    salary,
    totalHour,
    characterPrice,
    totalDays
  );
  const navigation = useNavigation();

  return (
    <Card style={styles.infoCard}>
      <Card.Content>
        <View style={styles.cardRow}>
          <Image
            source={{
              uri:
                char.characterImages[0]?.urlImage ||
                "https://via.placeholder.com/60",
            }}
            style={styles.characterImage}
          />
          <View style={styles.cardContent}>
            <Title style={styles.characterName}>
              Character: {character?.characterName || char.characterId}
            </Title>
            <Text style={styles.cardText}>
              🎭 Cosplayer: {cosplayer?.name || `ID: ${char.cosplayerId}`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: statusInfo.color,
                  marginRight: 6,
                }}
              />
              <Text style={styles.cardText}>Status: {statusInfo.label}</Text>
            </View>

            <TouchableOpacity onPress={onChangeCosplayer}>
              <Text style={styles.changeBtn}>🔁 Change Cosplayer</Text>
            </TouchableOpacity>

            <Text style={styles.cardText}>🕒 Total Time: {totalHour}h</Text>
            <View style={{ marginTop: 6, paddingLeft: 6 }}>
              {char.requestDateResponses?.map((dateObj, idx) => {
                const day =
                  dateObj.startDate?.split(" ")[1] || dateObj.startDate; // lấy ngày
                const startTime = dateObj.startDate?.split(" ")[0] || ""; // lấy giờ bắt đầu
                const endTime = dateObj.endDate?.split(" ")[0] || ""; // lấy giờ kết thúc
                return (
                  <View key={idx} style={{ marginBottom: 6 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ marginRight: 4 }}>•</Text>
                      <Text style={styles.cardText}>🗓 {day}</Text>
                    </View>
                    <Text
                      style={[
                        styles.cardText,
                        { marginLeft: 16, fontSize: 12, color: "#666" },
                      ]}
                    >
                      {startTime} - {endTime} ({dateObj.totalHour}h)
                    </Text>
                  </View>
                );
              })}
            </View>

            <Text style={styles.cardText}>
              💰 Cost: {totalCost.toLocaleString()}đ ({salary.toLocaleString()}
              đ/h)
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CharacterCard;
