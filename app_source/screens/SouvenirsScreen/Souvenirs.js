import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Animated, // Thêm Animated
} from "react-native";
import React, { useState, useRef } from "react"; // Thêm useRef
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SouvenirsStyles";

const Souvenirs = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current; // Thêm Animated.Value để theo dõi cuộn

  const productItems = [
    {
      ProductId: "1",
      ProductName: "Goku Figure",
      Description: "High-quality PVC figure of Goku from Dragon Ball.",
      Quantity: 10,
      Price: "$25",
      CreateDate: "2025-03-01",
      UpdateDate: "2025-03-15",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/R.db7eb58a193cedf3914c747b8a50c222?rik=llj3LgO8EN9t3Q&pid=ImgRaw&r=0",
    },
    {
      ProductId: "2",
      ProductName: "Naruto Poster",
      Description: "Vibrant poster featuring Naruto in his Hokage robe.",
      Quantity: 5,
      Price: "$15",
      CreateDate: "2025-03-02",
      UpdateDate: "2025-03-10",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.zLueSvLy6VhN9T6qovwCqQHaLl?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "3",
      ProductName: "Luffy Keychain",
      Description: "Cute keychain with Monkey D. Luffy from One Piece.",
      Quantity: 0,
      Price: "$5",
      CreateDate: "2025-03-03",
      UpdateDate: "2025-03-12",
      IsActive: false,
      Image:
        "https://th.bing.com/th/id/OIP.ytcafCIcDADhafCfE9fZHwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "4",
      ProductName: "Sasuke Figure",
      Description: "Detailed figure of Sasuke from Naruto Shippuden.",
      Quantity: 8,
      Price: "$30",
      CreateDate: "2025-03-04",
      UpdateDate: "2025-03-14",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.McmTHl9GfgZ2hXdoUyY24AHaKN?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "5",
      ProductName: "Attack on Titan Poster",
      Description: "Epic poster of the Survey Corps from Attack on Titan.",
      Quantity: 3,
      Price: "$20",
      CreateDate: "2025-03-05",
      UpdateDate: "2025-03-15",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.TfR7XD-Y6UZDt-uLfGzu0AHaKe?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "6",
      ProductName: "Ichigo Keychain",
      Description: "Stylish keychain featuring Ichigo from Bleach.",
      Quantity: 6,
      Price: "$6",
      CreateDate: "2025-03-06",
      UpdateDate: "2025-03-13",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.4prE5qrtUzrsEs4YGfa59QHaHa?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "7",
      ProductName: "Demon Slayer Figure",
      Description: "Intricate figure of Tanjiro from Demon Slayer.",
      Quantity: 4,
      Price: "$35",
      CreateDate: "2025-03-07",
      UpdateDate: "2025-03-15",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/R.ab0863043536677c6d7f74e659bb46c1?rik=Da4wTyce6BSPXA&pid=ImgRaw&r=0",
    },
    {
      ProductId: "8",
      ProductName: "Goku Figure",
      Description: "High-quality PVC figure of Goku from Dragon Ball.",
      Quantity: 10,
      Price: "$25",
      CreateDate: "2025-03-01",
      UpdateDate: "2025-03-15",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/R.db7eb58a193cedf3914c747b8a50c222?rik=llj3LgO8EN9t3Q&pid=ImgRaw&r=0",
    },
    {
      ProductId: "9",
      ProductName: "Naruto Poster",
      Description: "Vibrant poster featuring Naruto in his Hokage robe.",
      Quantity: 5,
      Price: "$15",
      CreateDate: "2025-03-02",
      UpdateDate: "2025-03-10",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.zLueSvLy6VhN9T6qovwCqQHaLl?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "10",
      ProductName: "Luffy Keychain",
      Description: "Cute keychain with Monkey D. Luffy from One Piece.",
      Quantity: 0,
      Price: "$5",
      CreateDate: "2025-03-03",
      UpdateDate: "2025-03-12",
      IsActive: false,
      Image:
        "https://th.bing.com/th/id/OIP.ytcafCIcDADhafCfE9fZHwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "11",
      ProductName: "Sasuke Figure",
      Description: "Detailed figure of Sasuke from Naruto Shippuden.",
      Quantity: 8,
      Price: "$30",
      CreateDate: "2025-03-04",
      UpdateDate: "2025-03-14",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.McmTHl9GfgZ2hXdoUyY24AHaKN?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "12",
      ProductName: "Attack on Titan Poster",
      Description: "Epic poster of the Survey Corps from Attack on Titan.",
      Quantity: 3,
      Price: "$20",
      CreateDate: "2025-03-05",
      UpdateDate: "2025-03-15",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.TfR7XD-Y6UZDt-uLfGzu0AHaKe?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "13",
      ProductName: "Ichigo Keychain",
      Description: "Stylish keychain featuring Ichigo from Bleach.",
      Quantity: 6,
      Price: "$6",
      CreateDate: "2025-03-06",
      UpdateDate: "2025-03-13",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/OIP.4prE5qrtUzrsEs4YGfa59QHaHa?rs=1&pid=ImgDetMain",
    },
    {
      ProductId: "14",
      ProductName: "Demon Slayer Figure",
      Description: "Intricate figure of Tanjiro from Demon Slayer.",
      Quantity: 4,
      Price: "$35",
      CreateDate: "2025-03-07",
      UpdateDate: "2025-03-15",
      IsActive: true,
      Image:
        "https://th.bing.com/th/id/R.ab0863043536677c6d7f74e659bb46c1?rik=Da4wTyce6BSPXA&pid=ImgRaw&r=0",
    },
  ];

  // Filter products based on search text and only active items
  const filteredItems = productItems.filter(
    (item) =>
      item.IsActive &&
      item.ProductName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Tạo hiệu ứng thu nhỏ header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.Image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.ProductName}</Text>
        <View style={styles.priceAdd}>
          <Text style={styles.productPrice}>{item.Price}</Text>
          <Ionicons name="add-circle" size={30} color="black" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header động */}
      <Animated.View
        style={[styles.headerBackground, { height: headerHeight }]}
      >
        <ImageBackground
          source={{
            uri: "https://nintendoeverything.com/wp-content/uploads/Pokemon-Center-7/9/16/pokemon-center-7.jpg",
          }}
          style={styles.headerImage} // Đổi tên để khớp với style mới
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Souvenirs</Text>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
        {/* List of products */}
        <Animated.FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.ProductId}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No products found</Text>
          )}
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

export default Souvenirs;
