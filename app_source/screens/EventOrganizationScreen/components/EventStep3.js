import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import styles from "../css/Step3Style";
import DetailEventOrganizationPageService from "../../../apiServices/eventOrganizeService/DetailEventOrganizationPageService";

const EventStep3 = ({ goNextStep ,goBackStep}) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [characterDetails, setCharacterDetails] = useState({});

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await DetailEventOrganizationPageService.getAllCharacters();
        setCharacters(data);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
        alert("Failed to load character list.");
      }
    };
    fetchCharacters();
  }, []);

  const toggleCharacter = (characterId) => {
    setCharacterDetails((prev) => {
      const isSelected = !!prev[characterId];
      if (isSelected) {
        const newData = { ...prev };
        delete newData[characterId];
        return newData;
      } else {
        return {
          ...prev,
          [characterId]: {
            quantity: "1",
            note: "",
          },
        };
      }
    });
  };

  const handleNext = () => {
    console.log(">>> characterDetails", characterDetails);
  const selectedCharacters = Object.entries(characterDetails)
    .filter(([_, val]) => {
      const qty = parseInt(val.quantity);
      return !isNaN(qty) && qty > 0;
    })
    .map(([characterId, val]) => ({
      characterId,
      quantity: parseInt(val.quantity),
      note: val.note || "",
    }));

  if (selectedCharacters.length === 0) {
    alert("Please select at least one character.");
    return;
  }

  goNextStep({
    useCosplayerList: false,
    selectedCharacters,
    allCharacters: characters,
  });
};


  const filteredCharacters = characters.filter((char) =>
    char.characterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
  <ScrollView
    style={styles.container}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ paddingBottom: 120 }}
  >
    <Text style={styles.title}>Select Characters</Text>

    <TextInput
      style={styles.searchInput}
      placeholder="Search by character name..."
      value={searchTerm}
      onChangeText={setSearchTerm}
    />

    <View style={styles.gridContainer}>
      {filteredCharacters.map((char, index) => {
        const selected = !!characterDetails[char.characterId];
        const charDetail = characterDetails[char.characterId];

        return (
          <View
            key={char.characterId}
            style={[
              styles.characterCardGrid,
              selected && styles.selectedCard,
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleCharacter(char.characterId)}
            >
              <Image
                source={{ uri: char.images?.[0]?.urlImage }}
                style={styles.characterImage}
                resizeMode="contain"
              />
              <Text style={styles.characterName}>{char.characterName}</Text>
              <Text style={styles.characterDesc}>{char.description}</Text>
              <Text style={styles.characterPrice}>
                {char.price.toLocaleString()}đ
              </Text>
            </TouchableOpacity>

            {selected && (
              <View style={styles.dropdownWrapper}>
                <Text style={styles.dropdownLabel}>Quantity</Text>
                <View style={styles.quantityWrapper}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      setCharacterDetails((prev) => {
                        const current = parseInt(
                          prev[char.characterId]?.quantity || "1"
                        );
                        const newQty = Math.max(1, current - 1);
                        return {
                          ...prev,
                          [char.characterId]: {
                            ...prev[char.characterId],
                            quantity: newQty.toString(),
                          },
                        };
                      })
                    }
                  >
                    <Text style={styles.qtySymbol}>–</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={styles.qtyInput}
                    keyboardType="numeric"
                    value={charDetail.quantity}
                    onChangeText={(text) =>
                      setCharacterDetails((prev) => ({
                        ...prev,
                        [char.characterId]: {
                          ...prev[char.characterId],
                          quantity: text.replace(/[^0-9]/g, "") || "1",
                        },
                      }))
                    }
                  />

                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      setCharacterDetails((prev) => {
                        const current = parseInt(
                          prev[char.characterId]?.quantity || "1"
                        );
                        const newQty = Math.min(99, current + 1);
                        return {
                          ...prev,
                          [char.characterId]: {
                            ...prev[char.characterId],
                            quantity: newQty.toString(),
                          },
                        };
                      })
                    }
                  >
                    <Text style={styles.qtySymbol}>+</Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Note"
                  multiline
                  numberOfLines={2}
                  value={charDetail.note || ""}
                  onChangeText={(text) =>
                    setCharacterDetails((prev) => ({
                      ...prev,
                      [char.characterId]: {
                        ...prev[char.characterId],
                        note: text,
                      },
                    }))
                  }
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  </ScrollView>

  <View style={styles.footerButtons}>
    <TouchableOpacity
      style={[styles.actionButton, styles.backButton]}
      onPress={goBackStep}
    >
      <Text style={styles.actionButtonText}>Back</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.actionButton, styles.nextButton]}
      onPress={handleNext}
    >
      <Text style={styles.actionButtonText}>Next</Text>
    </TouchableOpacity>
  </View>
</View>
  );
};

export default EventStep3;