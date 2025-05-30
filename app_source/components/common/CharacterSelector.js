import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import DetailEventOrganizationPageService from './../../apiServices/eventOrganizeService/DetailEventOrganizationPageService';
import { StyleSheet } from "react-native";
const CharacterSelector = ({
  selectedPairs,
  onCharacterSelected,
}) => {
  const [characters, setCharacters] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await DetailEventOrganizationPageService.getAllCharacters();
        const enrichedCharacters = await Promise.all(
          data.map(async (char) => {
            try {
              const fullChar = await DetailEventOrganizationPageService.getCharacterById(char.characterId);
              return {
                ...char,
                images: fullChar.images[0].urlImage || "",
              };
            } catch (error) {
              console.warn(`Failed to fetch character ${char.characterId}:`, error);
              return {
                ...char,
                images: "",
              };
            }
          })
        );
        setCharacters(enrichedCharacters);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
        alert("Failed to load character list.");
      }
    };
    fetchCharacters();
  }, []);

  const handleCharacterPress = (char) => {
    const isAlreadySelected = selectedPairs.some(
      (pair) => pair.character.characterId === char.characterId
    );
    if (isAlreadySelected) {
      Alert.alert("Already selected", "You have already assigned cosplayers for this character.");
      return;
    }
    onCharacterSelected(char);
  };

  return (
    <View style={styles.characterList}>
      {characters.map((char) => {
        const alreadySelected = selectedPairs.some(
          (pair) => pair.character.characterId === char.characterId
        );
        return (
          <TouchableOpacity
            key={char.characterId}
            onPress={() => handleCharacterPress(char)}
            style={[
              styles.characterCard,
              alreadySelected && styles.characterCardSelected,
            ]}
          >
            <View style={styles.imageContainer}>
              {!imageErrors[char.characterId] && char.images && (
                <Image
                  source={{ uri: char.images }}
                  style={styles.characterImage}
                  resizeMode="cover"
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [char.characterId]: true,
                    }))
                  }
                />
              )}
              {alreadySelected && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>

            <View>
              <Text style={styles.characterName}>{char.characterName}</Text>
              <Text style={styles.characterMeta}>
                Height: {char.minHeight}–{char.maxHeight} cm
              </Text>
              <Text style={styles.characterMeta}>
                Weight: {char.minWeight}–{char.maxWeight} kg
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    alignItems: "center",
  },
  characterList: {
    width: "100%",
    maxWidth: 400,
  },
  characterCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  characterCardSelected: {
    backgroundColor: "#e6f0ff",
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#eee",
    position: "relative",
  },
  characterImage: {
    width: "100%",
    height: "100%",
  },
  checkmark: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#22668a",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  checkmarkText: {
    color: "#fff",
    fontSize: 12,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  characterMeta: {
    fontSize: 14,
    color: "#555",
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


export default CharacterSelector;





