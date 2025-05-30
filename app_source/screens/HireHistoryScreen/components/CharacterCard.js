import React from "react";
import { View, Text, Image } from "react-native";
import { Card, Title } from "react-native-paper";
import styles from "../../HireHistoryScreen/css/HireHistoryStyles";
import {
  calculateCosplayerCost,
  calculateTotalHours,
  calculateTotalDays,
} from "../../../utils/calculateCost";
import { COSPLAYER_STATUS } from "../../../const/StatusHistory";
import useTaskStatus from "../../../hooks/useTaskStatus";

const CharacterCard = ({ char, cosplayer, character, contract }) => {
  const cosplayerId = cosplayer?.accountId;
  const contractId = contract?.contractId;
  const status = useTaskStatus(cosplayerId, contractId);

  const statusInfo = COSPLAYER_STATUS[status] ?? {
    label: "Pending",
    color: "#999",
  };

  const statusKeys = Object.keys(COSPLAYER_STATUS).filter((s) => s !== "Cancel");
  const progressIndex = statusKeys.indexOf(status);
  const progressPercent =
    status === "Cancel" ? 1 : progressIndex / (statusKeys.length - 1);

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

            <Text style={styles.cardText}>🕒 Total Time: {totalHour}h</Text>

            <View style={{ marginTop: 6, paddingLeft: 6 }}>
              {char.requestDateResponses?.map((dateObj, idx) => {
                const [startTime, day] = dateObj.startDate?.split(" ") || [];
                const [endTime] = dateObj.endDate?.split(" ") || [];
                return (
                  <View key={idx} style={{ marginBottom: 6 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ marginRight: 4 }}>•</Text>
                      <Text style={styles.cardText}>🗓 {day || dateObj.startDate}</Text>
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

            <View style={{ marginTop: 8 }}>
              <View
                style={{
                  height: 8,
                  backgroundColor: "#eee",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: 8,
                    width: `${progressPercent * 100}%`,
                    backgroundColor: statusInfo.color,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CharacterCard;
