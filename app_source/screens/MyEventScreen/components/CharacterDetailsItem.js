import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import { Text, List, Divider } from "react-native-paper";
import styles from "../styles/CharacterDetailsItemStyle";
const CharacterDetailsItem = ({ character }) => {
  const [expanded, setExpanded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showDates, setShowDates] = useState(false);

  return (
    <List.Accordion
      title={`Character: ${character.name} (Qty: ${character.quantity})`}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      titleStyle={styles.accordionTitle}
      style={styles.accordionContainer}
    >
      {/* Thông tin chính */}
      <View style={styles.infoBox}>
        <Text style={styles.infoItem}>📝 Description: {character.description}</Text>
        <Text style={styles.infoItem}>📏 Max Height: {character.maxHeight} cm</Text>
        <Text style={styles.infoItem}>⚖️ Max Weight: {character.maxWeight} kg</Text>
        <Text style={styles.infoItem}>📏 Min Height: {character.minHeight} cm</Text>
        <Text style={styles.infoItem}>⚖️ Min Weight: {character.minWeight} kg</Text>
        <Text style={[styles.infoItem, { fontWeight: "600" }]}>
          ✅ Status: {character.status}
        </Text>
      </View>

      <Divider />

      {/* Hình ảnh nhân vật */}
      <List.Accordion
        title="📸 Character Images"
        expanded={showImage}
        onPress={() => setShowImage(!showImage)}
        titleStyle={styles.subAccordionTitle}
      >
        <Image
          source={{ uri: character.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </List.Accordion>

      {/* Thời gian thuê */}
      <List.Accordion
        title="⏱️ Request Dates"
        expanded={showDates}
        onPress={() => setShowDates(!showDates)}
        titleStyle={styles.subAccordionTitle}
      >
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            Date: 23/05/2025 → 23/05/2025
          </Text>
          <Text style={styles.dateText}>
            Total Hours: 4.02
          </Text>
        </View>
      </List.Accordion>
    </List.Accordion>
  );
};



export default CharacterDetailsItem;
