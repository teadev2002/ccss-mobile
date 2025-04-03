// //--------------------------------------mock data
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./ChooseCharacterStyles";

// // Mock data cho danh sách characters
// const mockCharacters = [
//   {
//     characterId: "CH001",
//     categoryId: "C1",
//     characterName: "Naruto Uzumaki",
//     description: "Ninja from Hidden Leaf Village",
//     price: 150,
//     isActive: true,
//     maxHeight: 180,
//     maxWeight: 70,
//     minHeight: 160,
//     minWeight: 50,
//     quantity: 5,
//     createDate: "10:00 01/04/2025",
//     updateDate: null,
//     images: [
//       {
//         characterImageId: "CI001",
//         urlImage: "https://example.com/naruto.jpg",
//         createDate: "2025-04-01T10:00:00",
//         updateDate: null,
//         isAvatar: true,
//       },
//     ],
//   },
//   {
//     characterId: "CH002",
//     categoryId: "C2",
//     characterName: "Superman",
//     description: "Man of Steel",
//     price: 200,
//     isActive: true,
//     maxHeight: 190,
//     maxWeight: 100,
//     minHeight: 170,
//     minWeight: 80,
//     quantity: 2,
//     createDate: "12:00 01/04/2025",
//     updateDate: null,
//     images: [
//       {
//         characterImageId: "CI002",
//         urlImage: "https://example.com/superman.jpg",
//         createDate: "2025-04-01T12:00:00",
//         updateDate: null,
//         isAvatar: true,
//       },
//     ],
//   },
//   {
//     characterId: "CH003",
//     categoryId: "C3",
//     characterName: "Luffy",
//     description: "Captain of the Straw Hat Pirates",
//     price: 120,
//     isActive: true,
//     maxHeight: 175,
//     maxWeight: 65,
//     minHeight: 155,
//     minWeight: 45,
//     quantity: 4,
//     createDate: "14:00 01/04/2025",
//     updateDate: null,
//     images: [
//       {
//         characterImageId: "CI003",
//         urlImage: "https://example.com/luffy.jpg",
//         createDate: "2025-04-01T14:00:00",
//         updateDate: null,
//         isAvatar: true,
//       },
//     ],
//   },
// ];

// const ChooseCharacter = () => {
//   const navigation = useNavigation();

//   // Xử lý quay lại
//   const handleGoBack = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     } else {
//       console.log("Không thể quay lại màn hình trước.");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Choose Character</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <ScrollView style={styles.content}>
//         <Text style={styles.sectionTitle}>Choose Character</Text>
//         {mockCharacters.map((character) => (
//           <View key={character.characterId} style={styles.characterContainer}>
//             <Text style={styles.characterName}>{character.characterName}</Text>
//             <View style={styles.dimensionRow}>
//               <Text style={styles.dimensionText}>
//                 Height: {character.minHeight} - {character.maxHeight} cm
//               </Text>
//             </View>
//             <View style={styles.dimensionRow}>
//               <Text style={styles.dimensionText}>
//                 Min Weight: {character.minWeight} - {character.maxWeight} kg
//               </Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ChooseCharacter;

// mockdata + search
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./ChooseCharacterStyles";

// Mock data cho danh sách characters
const mockCharacters = [
  {
    characterId: "CH001",
    categoryId: "C1",
    characterName: "Naruto Uzumaki",
    description: "Ninja from Hidden Leaf Village",
    price: 150,
    isActive: true,
    maxHeight: 180,
    maxWeight: 70,
    minHeight: 160,
    minWeight: 50,
    quantity: 5,
    createDate: "10:00 01/04/2025",
    updateDate: null,
    images: [
      {
        characterImageId: "CI001",
        urlImage: "https://example.com/naruto.jpg",
        createDate: "2025-04-01T10:00:00",
        updateDate: null,
        isAvatar: true,
      },
    ],
  },
  {
    characterId: "CH002",
    categoryId: "C2",
    characterName: "Superman",
    description: "Man of Steel",
    price: 200,
    isActive: true,
    maxHeight: 190,
    maxWeight: 100,
    minHeight: 170,
    minWeight: 80,
    quantity: 2,
    createDate: "12:00 01/04/2025",
    updateDate: null,
    images: [
      {
        characterImageId: "CI002",
        urlImage: "https://example.com/superman.jpg",
        createDate: "2025-04-01T12:00:00",
        updateDate: null,
        isAvatar: true,
      },
    ],
  },
  {
    characterId: "CH003",
    categoryId: "C3",
    characterName: "Luffy",
    description: "Captain of the Straw Hat Pirates",
    price: 120,
    isActive: true,
    maxHeight: 175,
    maxWeight: 65,
    minHeight: 155,
    minWeight: 45,
    quantity: 4,
    createDate: "14:00 01/04/2025",
    updateDate: null,
    images: [
      {
        characterImageId: "CI003",
        urlImage: "https://example.com/luffy.jpg",
        createDate: "2025-04-01T14:00:00",
        updateDate: null,
        isAvatar: true,
      },
    ],
  },
  {
    characterId: "CH005",
    categoryId: "C4",
    characterName: "Ichigo Kurosaki",
    description: "Soul Reaper",
    price: 130,
    isActive: true,
    maxHeight: 185,
    maxWeight: 85,
    minHeight: 165,
    minWeight: 55,
    quantity: 3,
    createDate: "11:38 01/04/2025",
    updateDate: null,
    images: [
      {
        characterImageId: "CI005",
        urlImage: "https://example.com/ichigo.jpg",
        createDate: "2025-04-01T11:38:28.7030212",
        updateDate: null,
        isAvatar: null,
      },
    ],
  },
];

const ChooseCharacter = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(""); // State cho ô tìm kiếm

  // Xử lý quay lại
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Không thể quay lại màn hình trước.");
    }
  };

  // Lọc danh sách nhân vật dựa trên searchQuery
  const filteredCharacters = mockCharacters.filter((character) =>
    character.characterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Character</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Character</Text>

        {/* Ô tìm kiếm */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by character name..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Danh sách nhân vật */}
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <View key={character.characterId} style={styles.characterContainer}>
              <Text style={styles.characterName}>
                {character.characterName}
              </Text>
              <View style={styles.dimensionRow}>
                <Text style={styles.dimensionText}>
                  Height: {character.minHeight} - {character.maxHeight} cm
                </Text>
              </View>
              <View style={styles.dimensionRow}>
                <Text style={styles.dimensionText}>
                  Weight: {character.minWeight} - {character.maxWeight} kg
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No characters found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseCharacter;
