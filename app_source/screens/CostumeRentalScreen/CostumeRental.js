// import {
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   TextInput,
//   Animated,
// } from "react-native";
// import React, { useState, useRef } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import styles from "./CostumeRentalStyles";

// const CostumeRental = () => {
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState("");
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const cosplayItems = [
//     {
//       CharacterId: "1",
//       CharacterName: "Goku - Dragon Ball",
//       Description: "Bộ cosplay Goku cực chất, phù hợp cho fan Dragon Ball.",
//       Price: "$1,190",
//       MaxHeight: "190cm",
//       MinHeight: "160cm",
//       MaxWeight: "90kg",
//       MinWeight: "50kg",
//       Quantity: 5,
//       Image:
//         "https://th.bing.com/th/id/R.a2e59911422da890e48f22eeda5a6bdc?rik=YhGIGrVTQwaKpw&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20120430095947%2fultradragonball%2fimages%2f8%2f89%2fGoku_(Full_Body).jpg&ehk=h0KddAaKT4vXYXLJVcwUz%2f%2fwB8CwX95HXEZT9ftBH8E%3d&risl=&pid=ImgRaw&r=0",
//     },
//     {
//       CharacterId: "2",
//       CharacterName: "Naruto - Naruto Shippuden",
//       Description: "Bộ cosplay Naruto với áo choàng Hokage huyền thoại.",
//       Price: "$1,100",
//       MaxHeight: "185cm",
//       MinHeight: "155cm",
//       MaxWeight: "85kg",
//       MinWeight: "45kg",
//       Quantity: 8,
//       Image:
//         "https://th.bing.com/th/id/R.d0484046c219831537e64496671da419?rik=voNRANDSGd3R2Q&pid=ImgRaw&r=0",
//     },
//     {
//       CharacterId: "3",
//       CharacterName: "Spider-Man - Marvel",
//       Description: "Bộ cosplay Spider-Man co giãn, ôm sát cực đẹp.",
//       Price: "$1,690",
//       MaxHeight: "195cm",
//       MinHeight: "165cm",
//       MaxWeight: "95kg",
//       MinWeight: "55kg",
//       Quantity: 3,
//       Image:
//         "https://imgcdn.stablediffusionweb.com/2024/2/25/7ba53ebb-be04-419b-8a4d-507fd24fae4b.jpg",
//     },
//     {
//       CharacterId: "4",
//       CharacterName: "Levi - Attack on Titan",
//       Description: "Bộ cosplay Đội Trinh Sát của Levi, đầy đủ phụ kiện.",
//       Price: "$1,290",
//       MaxHeight: "180cm",
//       MinHeight: "150cm",
//       MaxWeight: "80kg",
//       MinWeight: "45kg",
//       Quantity: 7,
//       Image:
//         "https://th.bing.com/th/id/OIP.MvTi87o2efK26I_EntpNjQHaHg?rs=1&pid=ImgDetMain",
//     },
//     {
//       CharacterId: "5",
//       CharacterName: "Sailor Moon - Sailor Moon",
//       Description: "Bộ cosplay Sailor Moon lung linh, kèm phụ kiện.",
//       Price: "$1,341",
//       MaxHeight: "175cm",
//       MinHeight: "145cm",
//       MaxWeight: "70kg",
//       MinWeight: "40kg",
//       Quantity: 6,
//       Image:
//         "https://th.bing.com/th/id/OIP.cwyo2KGLiYn0XOftqer2hgHaLH?rs=1&pid=ImgDetMain",
//     },
//     {
//       CharacterId: "6",
//       CharacterName: "Sam  - Honkai StarRail",
//       Description: "Bộ Firefly lung linh, kèm phụ kiện.",
//       Price: "$5,000",
//       MaxHeight: "175cm",
//       MinHeight: "165cm",
//       MaxWeight: "70kg",
//       MinWeight: "40kg",
//       Quantity: 6,
//       Image:
//         "https://th.bing.com/th/id/OIP.mnBqs7EhPBOMKkY3L1KqbQHaJJ?rs=1&pid=ImgDetMain",
//     },
//     {
//       CharacterId: "7",
//       CharacterName: "HellDiver",
//       Description: "Bộ HellDiver lung linh, kèm phụ kiện.",
//       Price: "$799",
//       MaxHeight: "175cm",
//       MinHeight: "165cm",
//       MaxWeight: "70kg",
//       MinWeight: "40kg",
//       Quantity: 6,
//       Image:
//         "https://oyster.ignimgs.com/mediawiki/apis.ign.com/helldivers-2/6/64/Helldivers2_Armor_(6).png?width=1920",
//     },
//   ];

//   const filteredItems = cosplayItems.filter((item) =>
//     item.CharacterName.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [200, 80],
//     extrapolate: "clamp",
//   });

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Image source={{ uri: item.Image }} style={styles.itemImage} />
//         <View style={styles.itemDetails}>
//           <Text style={styles.itemName}>{item.CharacterName}</Text>
//           <Text
//             style={styles.itemSize}
//           >{`Height: ${item.MinHeight} - ${item.MaxHeight}`}</Text>
//           <Text style={styles.itemPrice}>{item.Price}</Text>
//         </View>
//         <View style={styles.itemStatusContainer}>
//           <TouchableOpacity style={styles.trackButton}>
//             <Text style={styles.trackButtonText}>See detail</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.headerBackground, { height: headerHeight }]}
//       >
//         <ImageBackground
//           source={{
//             uri: "https://cdn11.bigcommerce.com/s-benuoohm6l/images/stencil/original/image-manager/web-banner-min.jpg?t=1706043818",
//           }}
//           style={styles.headerImage}
//         >
//           <View style={styles.overlay} />
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backButton}
//             >
//               <Ionicons name="arrow-back" size={30} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Costume Rental</Text>
//             <TouchableOpacity
//               style={styles.cartButton}
//               onPress={() => navigation.navigate("Cart")}
//             >
//               <Ionicons name="cart" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </ImageBackground>
//       </Animated.View>

//       <View style={styles.content}>
//         <View style={styles.searchContainer}>
//           <Ionicons
//             name="search"
//             size={20}
//             color="#666"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for character..."
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor="#666"
//           />
//         </View>
//         <Animated.FlatList
//           data={filteredItems}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.CharacterId}
//           contentContainerStyle={styles.listContent}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: false } // Đổi thành false
//           )}
//           scrollEventThrottle={16}
//         />
//       </View>

//       {/* <TouchableOpacity
//         style={styles.cartButton}
//         onPress={() => navigation.navigate("Cart")}
//       >
//         <Ionicons name="cart" size={24} color="#fff" />
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// export default CostumeRental;

//test
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Thêm LinearGradient từ Expo
import styles from "./CostumeRentalStyles";

const CostumeRental = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const cosplayItems = [
    {
      CharacterId: "1",
      CharacterName: "Goku - Dragon Ball",
      Description: "Bộ cosplay Goku cực chất, phù hợp cho fan Dragon Ball.",
      Price: "$1,190",
      MaxHeight: "190cm",
      MinHeight: "160cm",
      MaxWeight: "90kg",
      MinWeight: "50kg",
      Quantity: 5,
      Image:
        "https://th.bing.com/th/id/R.a2e59911422da890e48f22eeda5a6bdc?rik=YhGIGrVTQwaKpw&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20120430095947%2fultradragonball%2fimages%2f8%2f89%2fGoku_(Full_Body).jpg&ehk=h0KddAaKT4vXYXLJVcwUz%2f%2fwB8CwX95HXEZT9ftBH8E%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      CharacterId: "2",
      CharacterName: "Naruto - Naruto Shippuden",
      Description: "Bộ cosplay Naruto với áo choàng Hokage huyền thoại.",
      Price: "$1,100",
      MaxHeight: "185cm",
      MinHeight: "155cm",
      MaxWeight: "85kg",
      MinWeight: "45kg",
      Quantity: 8,
      Image:
        "https://th.bing.com/th/id/R.d0484046c219831537e64496671da419?rik=voNRANDSGd3R2Q&pid=ImgRaw&r=0",
    },
    {
      CharacterId: "3",
      CharacterName: "Spider-Man - Marvel",
      Description: "Bộ cosplay Spider-Man co giãn, ôm sát cực đẹp.",
      Price: "$1,690",
      MaxHeight: "195cm",
      MinHeight: "165cm",
      MaxWeight: "95kg",
      MinWeight: "55kg",
      Quantity: 3,
      Image:
        "https://imgcdn.stablediffusionweb.com/2024/2/25/7ba53ebb-be04-419b-8a4d-507fd24fae4b.jpg",
    },
    {
      CharacterId: "4",
      CharacterName: "Levi - Attack on Titan",
      Description: "Bộ cosplay Đội Trinh Sát của Levi, đầy đủ phụ kiện.",
      Price: "$1,290",
      MaxHeight: "180cm",
      MinHeight: "150cm",
      MaxWeight: "80kg",
      MinWeight: "45kg",
      Quantity: 7,
      Image:
        "https://th.bing.com/th/id/OIP.MvTi87o2efK26I_EntpNjQHaHg?rs=1&pid=ImgDetMain",
    },
    {
      CharacterId: "5",
      CharacterName: "Sailor Moon - Sailor Moon",
      Description: "Bộ cosplay Sailor Moon lung linh, kèm phụ kiện.",
      Price: "$1,341",
      MaxHeight: "175cm",
      MinHeight: "145cm",
      MaxWeight: "70kg",
      MinWeight: "40kg",
      Quantity: 6,
      Image:
        "https://th.bing.com/th/id/OIP.cwyo2KGLiYn0XOftqerasant2hgHaLH?rs=1&pid=ImgDetMain",
    },
    {
      CharacterId: "6",
      CharacterName: "Sam  - Honkai StarRail",
      Description: "Bộ Firefly lung linh, kèm phụ kiện.",
      Price: "$5,000",
      MaxHeight: "175cm",
      MinHeight: "165cm",
      MaxWeight: "70kg",
      MinWeight: "40kg",
      Quantity: 6,
      Image:
        "https://th.bing.com/th/id/OIP.mnBqs7EhPBOMKkY3L1KqbQHaJJ?rs=1&pid=ImgDetMain",
    },
    {
      CharacterId: "7",
      CharacterName: "HellDiver",
      Description: "Bộ HellDiver lung linh, kèm phụ kiện.",
      Price: "$799",
      MaxHeight: "175cm",
      MinHeight: "165cm",
      MaxWeight: "70kg",
      MinWeight: "40kg",
      Quantity: 6,
      Image:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/helldivers-2/6/64/Helldivers2_Armor_(6).png?width=1920",
    },
  ];

  const filteredItems = cosplayItems.filter((item) =>
    item.CharacterName.toLowerCase().includes(searchText.toLowerCase())
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.Image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.CharacterName}</Text>
          <Text
            style={styles.itemSize}
          >{`Height: ${item.MinHeight} - ${item.MaxHeight}`}</Text>
          <Text style={styles.itemPrice}>{item.Price}</Text>
        </View>
        <View style={styles.itemStatusContainer}>
          {/* Thay TouchableOpacity bằng LinearGradient */}
          <TouchableOpacity>
            <LinearGradient
              colors={["#510545", "#22668a"]} // Gradient từ #510545 đến #22668a
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.trackButton}
            >
              <Text style={styles.trackButtonText}>See detail</Text>
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
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart" size={24} color="#fff" />
            </TouchableOpacity>
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
          keyExtractor={(item) => item.CharacterId}
          contentContainerStyle={styles.listContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
};

export default CostumeRental;
