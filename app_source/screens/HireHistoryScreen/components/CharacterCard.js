import React, {useEffect} from "react";
import { View, Text, Image } from "react-native";
import { Card, Title } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";
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
  cosplayerStatuses, 
}) => {
  const cosplayerId = cosplayer?.accountId;
  const status = cosplayerStatuses?.[cosplayerId] ?? 0;
  const statusInfo = COSPLAYER_STATUS[status] ?? { label: "Unknown", color: "#999" };
  const totalHour = calculateTotalHours(char.requestDateResponses);
  const salary = cosplayer?.salaryIndex || 0;
  const totalDays = calculateTotalDays(char.requestDateResponses);
  const characterPrice = character?.price || 0;
  const totalCost = calculateCosplayerCost(salary, totalHour, characterPrice, totalDays);

  useEffect(() => {
    console.log("🧩 CharacterCard Debug Info:");
    console.log("➡️ char:", char);
    console.log("➡️ cosplayer:", cosplayer);
    console.log("➡️ character:", character);
    console.log("➡️ cosplayerId:", cosplayerId);
    console.log("➡️ status (from map):", status);
    console.log("➡️ statusInfo:", statusInfo);
    console.log("🧮 totalHour:", totalHour);
    console.log("🧮 totalDays:", totalDays);
    console.log("💰 salary:", salary);
    console.log("💰 characterPrice:", characterPrice);
    console.log("💰 totalCost:", totalCost);
  }, [char, cosplayer, character, cosplayerStatuses]);

  return (
    <Card style={styles.infoCard}>
      <Card.Content>
        <View style={styles.cardRow}>
          <Image
            source={{
              uri: char.characterImages[0]?.urlImage || "https://via.placeholder.com/60",
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
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
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

            <Text style={styles.cardText}>🕒 Total Time: {totalHour}h</Text>
            <View style={{ marginTop: 6, paddingLeft: 6 }}>
              {char.requestDateResponses?.map((dateObj, idx) => {
                const day = dateObj.startDate?.split(" ")[1] || dateObj.startDate;
                const startTime = dateObj.startDate?.split(" ")[0] || "";
                const endTime = dateObj.endDate?.split(" ")[0] || "";
                return (
                  <View key={idx} style={{ marginBottom: 6 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              💰 Cost: {totalCost.toLocaleString()}đ ({salary.toLocaleString()}đ/h)
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CharacterCard;

