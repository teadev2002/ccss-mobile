import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
    ScrollView,
  Image,
  TextInput,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Thêm LinearGradient từ Expo
import styles from "./CostumeRentalStyles";
import CharacterService from "../../apiServices/characterService/CharacterService";
import RentalModal from "./components/RentalModal";

const CostumeRental = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [characters, setCharacters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [rentalForm, setRentalForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    district: "",
    ward: "",
    street: "",
    quantity: "1",
    agreeTerms: false,
  });

  useEffect(() => {
  if (modalVisible && selectedCharacter) {
    setRentalForm({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      district: "",
      ward: "",
      street: "",
      quantity: "1",
      agreeTerms: false,
    });
  }
}, [modalVisible, selectedCharacter]);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const allCharacters = await CharacterService.getAllCharacters();

        const characterDetailsPromises = allCharacters.map(
          async (character) => {
            const details = await CharacterService.getCharacterById(
              character.characterId
            );

            return {
              ...details,
              image: details.images?.[0]?.urlImage || null, // Lấy ảnh đầu tiên hoặc null nếu không có
            };
          }
        );

        const detailedCharacters = await Promise.all(characterDetailsPromises);
        setCharacters(detailedCharacters);
      } catch (error) {
        console.error("Failed to fetch characters with details:", error);
      }
    };

    fetchCharacters();
  }, []);

  const filteredItems = characters.filter((item) =>
    item.characterName.toLowerCase().includes(searchText.toLowerCase())
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.characterName}</Text>
          <Text
            style={styles.itemSize}
          >{`Height: ${item.minHeight} cm - ${item.maxHeight} cm`}</Text>
          <Text style={styles.itemPrice}>Price: {item.price} VND</Text>
          <Text style={styles.itemPrice}>Quantity: {item.quantity}</Text>
          
        </View>
        <View style={styles.itemStatusContainer}>
          {/* Thay TouchableOpacity bằng LinearGradient */}
          <TouchableOpacity
            onPress={() => {
              setSelectedCharacter(item);
              setModalVisible(true);
            }}
          >
            <LinearGradient
              colors={["#510545", "#22668a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.trackButton}
            >
              <Text style={styles.trackButtonText}>Rent Now</Text>
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
        />
      </View>

      <RentalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        rentalForm={rentalForm}
        setRentalForm={setRentalForm}
        selectedCharacter={selectedCharacter}
      />
    </View>
  );
};

export default CostumeRental;
