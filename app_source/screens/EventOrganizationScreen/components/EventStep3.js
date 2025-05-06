import React, { useState, useMemo  } from "react";

import styles from "../css/Step3Style"; // Adjust the path to your styles
import {
  View,
  Text,
  TextInput,
  
  TouchableOpacity,
  Image,
  
  ScrollView,
  Button,
  Modal,
} from "react-native";

const EventStep3 = ({ goNextStep }) => {
    const [useCosplayerList, setUseCosplayerList] = useState(true);
    const [characterSearch, setCharacterSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [selectedCosplayers, setSelectedCosplayers] = useState([]);
    const [manualQuantity, setManualQuantity] = useState("1");
    const [characterModalVisible, setCharacterModalVisible] = useState(false);
    const [currentEditingCosplayerId, setCurrentEditingCosplayerId] = useState(null);

  const cosplayers = [
    {
      id: 1,
      name: "Hana",
      gender: "Female",
      categories: ["Superheroes", "Sci-Fi"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 100,
    },
    {
      id: 2,
      name: "Kai",
      gender: "Male",
      categories: ["Superheroes", "Anime"],
      crossGenderAllowed: true,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 120,
    },
    {
      id: 3,
      name: "Miko",
      gender: "Female",
      categories: ["Anime"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 80,
    },
    {
      id: 4,
      name: "Yuki",
      gender: "Female",
      categories: ["Anime", "Fantasy"],
      crossGenderAllowed: true,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 150,
    },
    {
      id: 5,
      name: "Taro",
      gender: "Male",
      categories: ["Fantasy", "Anime"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 90,
    },
    {
      id: 6,
      name: "Rin",
      gender: "Female",
      categories: ["Anime", "Game"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 110,
    },
    {
      id: 7,
      name: "Sora",
      gender: "Male",
      categories: ["Game", "Fantasy"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 130,
    },
    {
      id: 8,
      name: "Aki",
      gender: "Female",
      categories: ["Superheroes", "Sci-Fi"],
      crossGenderAllowed: true,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 140,
    },
    {
      id: 9,
      name: "Jin",
      gender: "Male",
      categories: ["Anime", "Game"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 95,
    },
    {
      id: 10,
      name: "Luna",
      gender: "Female",
      categories: ["Fantasy", "Sci-Fi"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 125,
    },
    {
      id: 11,
      name: "Kenta",
      gender: "Male",
      categories: ["Superheroes", "Historical"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 115,
    },
    {
      id: 12,
      name: "Nami",
      gender: "Female",
      categories: ["Anime", "Game"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 105,
    },
    {
      id: 13,
      name: "Haru",
      gender: "Male",
      categories: ["Fantasy", "Historical"],
      crossGenderAllowed: true,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 135,
    },
    {
      id: 14,
      name: "Sakura",
      gender: "Female",
      categories: ["Anime", "Historical"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 85,
    },
    {
      id: 15,
      name: "Riku",
      gender: "Male",
      categories: ["Sci-Fi", "Game"],
      crossGenderAllowed: false,
      image:
        "https://universo-nintendo.com.mx/my_uploads/2022/09/Chainsaw-Man-Makima-Cosplay-Rakukoo.jpg",
      price: 145,
    },
  ];

  const characters = [
    { name: "Superman", category: "Superheroes", gender: "Male", price: 80 },
    {
      name: "Wonder Woman",
      category: "Superheroes",
      gender: "Female",
      price: 90,
    },
    { name: "Naruto", category: "Anime", gender: "Male", price: 70 },
    { name: "Sailor Moon", category: "Anime", gender: "Female", price: 85 },
    { name: "Gandalf", category: "Fantasy", gender: "Male", price: 95 },
    { name: "Ellen Ripley", category: "Sci-Fi", gender: "Female", price: 75 },
    { name: "Batman", category: "Superheroes", gender: "Male", price: 100 },
    { name: "Catwoman", category: "Superheroes", gender: "Female", price: 80 },
    { name: "Luffy", category: "Anime", gender: "Male", price: 65 },
    { name: "Nami", category: "Anime", gender: "Female", price: 70 },
    { name: "Aragorn", category: "Fantasy", gender: "Male", price: 90 },
    { name: "Galadriel", category: "Fantasy", gender: "Female", price: 85 },
    { name: "Master Chief", category: "Game", gender: "Male", price: 95 },
    { name: "Lara Croft", category: "Game", gender: "Female", price: 80 },
    { name: "Darth Vader", category: "Sci-Fi", gender: "Male", price: 100 },
    { name: "Leia Organa", category: "Sci-Fi", gender: "Female", price: 75 },
    { name: "Geralt of Rivia", category: "Fantasy", gender: "Male", price: 90 },
    { name: "Yennefer", category: "Fantasy", gender: "Female", price: 85 },
    { name: "Ichigo Kurosaki", category: "Anime", gender: "Male", price: 70 },
    { name: "Rukia Kuchiki", category: "Anime", gender: "Female", price: 65 },
    { name: "Samurai Jack", category: "Historical", gender: "Male", price: 80 },
    {
      name: "Joan of Arc",
      category: "Historical",
      gender: "Female",
      price: 75,
    },
    { name: "Link", category: "Game", gender: "Male", price: 85 },
    { name: "Zelda", category: "Game", gender: "Female", price: 80 },
    { name: "Iron Man", category: "Superheroes", gender: "Male", price: 95 },
    {
      name: "Black Widow",
      category: "Superheroes",
      gender: "Female",
      price: 85,
    },
  ];

  const filteredCosplayers = useMemo(() => {
    const search = characterSearch.toLowerCase();
    return cosplayers.filter(
      (c) =>
        (genderFilter === "All" || c.gender === genderFilter) &&
        c.name.toLowerCase().includes(search)
    );
  }, [cosplayers, characterSearch, genderFilter]);

  const isSelected = (id) => selectedCosplayers.some((item) => item.cosplayer.id === id);

  const toggleCosplayer = (cosplayer) => {
    setSelectedCosplayers((prev) => {
      const exists = prev.find((item) => item.cosplayer.id === cosplayer.id);
      if (exists) {
        return prev.filter((item) => item.cosplayer.id !== cosplayer.id);
      } else {
        return [...prev, { cosplayer, character: "", note: "" }];
      }
    });
  };

  const updateCosplayerDetail = (id, field, value) => {
    setSelectedCosplayers((prev) =>
      prev.map((item) =>
        item.cosplayer.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeCosplayer = (id) => {
    setSelectedCosplayers((prev) =>
      prev.filter((item) => item.cosplayer.id !== id)
    );
  };

  const handleNext = () => {
    const quantity = useCosplayerList
      ? selectedCosplayers.length
      : Math.max(1, parseInt(manualQuantity) || 1);

    if (useCosplayerList && quantity === 0) {
      alert("Please select at least one cosplayer.");
      return;
    }

    goNextStep({
      useCosplayerList,
      selectedCosplayers: useCosplayerList ? selectedCosplayers : [],
      manualQuantity: quantity,
    });
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Cosplayers</Text>

      <Text style={styles.switchLabel} onPress={() => setUseCosplayerList((prev) => !prev)}>
        {useCosplayerList
          ? "Switch to manual number input"
          : "Switch to selecting specific cosplayers"}
      </Text>

      {useCosplayerList ? (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={characterSearch}
            onChangeText={setCharacterSearch}
          />
          <View style={styles.genderFilterGroup}>
  {["All", "Male", "Female"].map((gender) => (
    <TouchableOpacity
      key={gender}
      onPress={() => setGenderFilter(gender)}
      style={[
        styles.genderButton,
        genderFilter === gender && styles.genderButtonSelected,
      ]}
    >
      <Text
        style={[
          styles.genderButtonText,
          genderFilter === gender && styles.genderButtonTextSelected,
        ]}
      >
        {gender}
      </Text>
    </TouchableOpacity>
  ))}
</View>


          {filteredCosplayers.map((cosplayer) => {
            const selected = isSelected(cosplayer.id);
            return (
              <TouchableOpacity
                key={cosplayer.id}
                onPress={() => toggleCosplayer(cosplayer)}
                style={[styles.cosplayerCard, selected && styles.selectedCard]}
              >
                <Image source={{ uri: cosplayer.image }} style={styles.cosplayerImage} />
                <View>
                  <Text style={styles.cosplayerName}>{cosplayer.name}</Text>
                  <Text>{cosplayer.categories.join(", ")}</Text>
                  <Text style={{ color: "#888" }}>${cosplayer.price}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {selectedCosplayers.length > 0 && (
            <>
              <Text style={styles.subTitle}>Assign Characters</Text>
              {selectedCosplayers.map((item) => (
                <View key={item.cosplayer.id} style={styles.assignRow}>
                  <Text>{item.cosplayer.name}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Character"
                    value={item.character}
                    onFocus={() => {
                      setCurrentEditingCosplayerId(item.cosplayer.id);
                      setCharacterModalVisible(true);
                    }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Note"
                    value={item.note}
                    onChangeText={(text) =>
                      updateCosplayerDetail(item.cosplayer.id, "note", text)
                    }
                  />
                  <Button title="Remove" color="red" onPress={() => removeCosplayer(item.cosplayer.id)} />
                </View>
              ))}
            </>
          )}
        </>
      ) : (
        <View style={styles.inputGroup}>
          <Text>Number of Cosplayers</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={manualQuantity}
            onChangeText={(text) => setManualQuantity(text.replace(/[^0-9]/g, ""))}
          />
        </View>
      )}

      <Modal animationType="slide" transparent visible={characterModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Character</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {characters.map((char, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    updateCosplayerDetail(currentEditingCosplayerId, "character", char.name);
                    setCharacterModalVisible(false);
                    setCurrentEditingCosplayerId(null);
                  }}
                  style={styles.characterOption}
                >
                  <Text>{char.name}</Text>
                  <Text style={{ color: "#888" }}>{char.category} - {char.gender}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title="Cancel" onPress={() => setCharacterModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Next" onPress={handleNext} />
    </ScrollView>
  );
};

export default EventStep3;

