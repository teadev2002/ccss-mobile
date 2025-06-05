import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import styles from "./CostumeRentalStyles";
import CharacterService from "../../apiServices/characterService/CharacterService";
import RentalModal from "./components/RentalModal";

const CostumeRental = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [characters, setCharacters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [rentalForm, setRentalForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    district: "",
    ward: "",
    street: "",
    agreeTerms: false,
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const allCharacters = await CharacterService.getAllCharacters();

        const characterDetailsPromises = allCharacters.map(async (character) => {
          try {
            const details = await CharacterService.getCharacterById(
              character.characterId
            );
            return {
              ...details,
              image: details.images?.[0]?.urlImage || null,
            };
          } catch (error) {
            console.error(`Failed to fetch details for ${character.characterId}:`, error);
            return null;
          }
        });

        const detailedCharacters = (await Promise.all(characterDetailsPromises)).filter(
          (char) => char !== null
        );
        setCharacters(detailedCharacters);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to load characters. Please try again.",
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      // Reset rentalForm when modal opens
      setRentalForm({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        district: "",
        ward: "",
        street: "",
        agreeTerms: false,
      });
    }
  }, [modalVisible]);

  const filteredItems = characters.filter((item) =>
    item.characterName.toLowerCase().includes(searchText.toLowerCase())
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  const handleSelectCharacter = (item) => {
    const isAlreadySelected = selectedCharacters.find(
      (c) => c.characterId === item.characterId
    );

    if (isAlreadySelected) {
      setSelectedCharacters((prev) =>
        prev.filter((c) => c.characterId !== item.characterId)
      );
      Toast.show({
        type: "info",
        text1: "Character Deselected",
        text2: `${item.characterName} has been removed from selection.`,
        position: "top",
      });
    } else {
      if (selectedCharacters.length >= 10) {
        Toast.show({
          type: "info",
          text1: "Selection Limit Reached",
          text2: "You can select up to 10 characters only.",
          position: "top",
        });
        return;
      }
      setSelectedCharacters((prev) => [...prev, item]);
      Toast.show({
        type: "success",
        text1: "Character Selected",
        text2: `${item.characterName} has been added to your selection.`,
        position: "top",
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.characterName}</Text>
          <Text
            style={styles.itemSize}
          >{`Height: ${item.minHeight} cm - ${item.maxHeight} cm`}</Text>
          <Text style={styles.itemPrice}>Price: {item.price?.toLocaleString()} VND</Text>
          <Text style={styles.itemPrice}>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.itemStatusContainer}>
          <TouchableOpacity onPress={() => handleSelectCharacter(item)}>
            <LinearGradient
              colors={
                selectedCharacters.find((c) => c.characterId === item.characterId)
                  ? ["#ffa500", "#ff4500"]
                  : ["#510545", "#22668a"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.trackButton}
            >
              <Text style={styles.trackButtonText}>
                {selectedCharacters.find((c) => c.characterId === item.characterId)
                  ? "Selected"
                  : "Select"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.headerBackground, { height: headerHeight }]}
      >
        <ImageBackground
          source={{
            uri: "https://cdn11.bigcommerce.com/s-benuoohm6l/images/stencil/original/image-manager/web-banner-min.jpg?t=1706043818",
          }}
          style={styles.headerImage}
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Costume Rental</Text>
          </View>
        </ImageBackground>
      </Animated.View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for character..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading characters...</Text>
          </View>
        ) : (
          <Animated.FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.characterId}
            contentContainerStyle={styles.listContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No characters found.</Text>
            }
          />
        )}
      </View>

      {selectedCharacters.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.proceedButton}
          >
            <Text style={styles.proceedButtonText}>
              Proceed to Rent ({selectedCharacters.length} selected)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <RentalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        rentalForm={rentalForm}
        setRentalForm={setRentalForm}
        selectedCharacters={selectedCharacters}
      />
    </View>
  );
};

export default CostumeRental;