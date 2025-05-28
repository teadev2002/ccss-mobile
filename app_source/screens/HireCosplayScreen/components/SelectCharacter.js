import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/SelectCharacterStyles";
import AppBarSimple from "../../../components/appbar/SimpleAppBar";
import HireCosplayerService from "../../../apiServices/hireCosplayerService/hireCosplayerService";
import CharacterCosplayerModal from "./CharacterCosplayerModal";
import { HireFlowContext } from "../../../../assets/context/HireFlowContext";
import DetailEventOrganizationPageService from "../../../apiServices/eventOrganizeService/DetailEventOrganizationPageService";

const SelectCharacter = ({ navigation }) => {
  const { formData, timeData, selectedPairs, setSelectedPairs } =
    useContext(HireFlowContext);
  const [characters, setCharacters] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const usedCosplayerIds = selectedPairs.flatMap((pair) =>
    pair.cosplayers.map((c) => c.accountId)
  );
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data =
          await DetailEventOrganizationPageService.getAllCharacters();

        // Dùng Promise.all để gọi đồng thời các getCharacterById
        const enrichedCharacters = await Promise.all(
          data.map(async (char) => {
            try {
              const fullChar =
                await DetailEventOrganizationPageService.getCharacterById(
                  char.characterId
                );
              return {
                ...char,
                images: fullChar.images[0].urlImage || "",
              };
            } catch (error) {
              console.warn(
                `Failed to fetch character ${char.characterId}:`,
                error
              );
              return {
                ...char,
                images: "",
              };
            }
          })
        );

        setCharacters(enrichedCharacters);
        console.log(
          "Enriched Characters:",
          JSON.stringify(enrichedCharacters, null, 2)
        );
      } catch (error) {
        console.error("Failed to fetch characters:", error);
        alert("Failed to load character list.");
      }
    };

    fetchCharacters();
  }, []);

  const openModalForCharacter = (character) => {
    const isAlreadySelected = selectedPairs.some(
      (pair) => pair.character.characterId === character.characterId
    );
    if (isAlreadySelected) {
      Alert.alert(
        "Already selected",
        "You have already assigned cosplayers for this character."
      );
      return;
    }
    setCurrentCharacter(character);
    setModalVisible(true);
  };

  const handleConfirmCosplayers = (cosplayers) => {
    if (cosplayers.length === 0) {
      Alert.alert(
        "No cosplayer selected",
        "Please select at least one cosplayer."
      );
      return;
    }

    setSelectedPairs((prev) => [
      ...prev,
      { character: currentCharacter, cosplayers },
    ]);
    setModalVisible(false);
    setCurrentCharacter(null);
  };

  const handleNext = () => {
    if (selectedPairs.length === 0) {
      Alert.alert(
        "No character selected",
        "Please select at least one character with cosplayers."
      );
      return;
    }
    navigation.navigate("ConfirmRequest");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBarSimple title="Select Characters" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.characterList}>
          {characters.map((char) => {
            const alreadySelected = selectedPairs.some(
              (pair) => pair.character.characterId === char.characterId
            );
            return (
              <TouchableOpacity
                key={char.characterId}
                onPress={() => openModalForCharacter(char)}
                style={[
                  styles.characterCard,
                  alreadySelected && styles.characterCardSelected,
                ]}
              >
                <View style={styles.imageContainer}>
                  {!imageErrors[char.characterId] &&
                    char.images &&
                    char.images.length > 0 && (
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

          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <LinearGradient
              colors={["#510545", "#22668a"]}
              style={styles.gradientButton}
            >
              <Text style={styles.submitButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL COSPLAYER CHO CHARACTER */}
      {currentCharacter && (
        <CharacterCosplayerModal
          visible={modalVisible}
          character={currentCharacter}
          usedCosplayerIds={usedCosplayerIds}
          onClose={() => {
            setModalVisible(false);
            setCurrentCharacter(null);
          }}
          onConfirm={handleConfirmCosplayers}
        />
      )}
    </SafeAreaView>
  );
};

export default SelectCharacter;
