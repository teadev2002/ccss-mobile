import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./CosplayerStyles";

// Dữ liệu mẫu (giả lập danh sách cosplayer)
const cosplayers = [
  {
    AccountId: 1,
    Name: "Luna Star",
    Description: "Chuyên cosplay anime, nổi tiếng với nhân vật Sailor Moon.",
    AverageStar: 4.8,
    TaskQuantity: 25,
    imageUrl:
      "https://th.bing.com/th/id/OIP.w-IUqeexjoqdRC8OXtfNKgHaLG?rs=1&pid=ImgDetMain",
  },
  {
    AccountId: 2,
    Name: "Kaito Blaze",
    Description: "Cosplayer game, chuyên về nhân vật từ Genshin Impact.",
    AverageStar: 4.9,
    TaskQuantity: 30,
    imageUrl:
      "https://th.bing.com/th/id/OIP.RXr8sSCHcL5B8drVq7sTuAAAAA?rs=1&pid=ImgDetMain",
  },
  {
    AccountId: 3,
    Name: "Sakura Dream",
    Description: "Cosplayer đa phong cách, nổi bật với nhân vật từ Naruto.",
    AverageStar: 4.7,
    TaskQuantity: 20,
    imageUrl: "https://pbs.twimg.com/media/C-f2Id4UMAEUj84.jpg",
  },
  {
    AccountId: 4,
    Name: "Luna Star",
    Description: "Chuyên cosplay anime, nổi tiếng với nhân vật Sailor Moon.",
    AverageStar: 4.8,
    TaskQuantity: 25,
    imageUrl:
      "https://th.bing.com/th/id/OIP.w-IUqeexjoqdRC8OXtfNKgHaLG?rs=1&pid=ImgDetMain",
  },
  {
    AccountId: 5,
    Name: "Kaito Blaze",
    Description: "Cosplayer game, chuyên về nhân vật từ Genshin Impact.",
    AverageStar: 4.9,
    TaskQuantity: 30,
    imageUrl:
      "https://th.bing.com/th/id/OIP.RXr8sSCHcL5B8drVq7sTuAAAAA?rs=1&pid=ImgDetMain",
  },
  {
    AccountId: 6,
    Name: "Sakura Dream",
    Description: "Cosplayer đa phong cách, nổi bật với nhân vật từ Naruto.",
    AverageStar: 4.7,
    TaskQuantity: 20,
    imageUrl: "https://pbs.twimg.com/media/C-f2Id4UMAEUj84.jpg",
  },
];

const Cosplayer = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");

  // Hiệu ứng thu nhỏ header khi cuộn
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  // Lọc cosplayer dựa trên searchQuery
  const filteredCosplayers = cosplayers.filter((cosplayer) =>
    cosplayer.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render mỗi cosplayer
  const renderCosplayer = ({ item }) => (
    <Card style={styles.cosplayerCard}>
      <View style={styles.cosplayerContainer}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={styles.cosplayerImage}
        />
        <View style={styles.cosplayerInfo}>
          <Text style={styles.cosplayerName}>{item.Name}</Text>
          <Text style={styles.cosplayerDescription}>{item.Description}</Text>
          <View style={styles.cosplayerStats}>
            <Text style={styles.cosplayerStat}>⭐ {item.AverageStar}</Text>
            <Text style={styles.cosplayerStat}>
              📅 {item.TaskQuantity} Projects
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log(`Đặt thuê ${item.Name}`);
            }}
            style={styles.bookButton}
          >
            <LinearGradient
              colors={["#510545", "#22668a"]} // Gradient từ #510545 đến #22668a
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton} // Thêm style mới cho gradient
            >
              <Text style={styles.buttonText}>View</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <Animated.View
        style={[styles.headerBackground, { height: headerHeight }]}
      >
        <ImageBackground
          source={{
            uri: "https://th.bing.com/th/id/R.32ada2b20a764c07f62d8405b21c1ae7?rik=QbEtGn4nfD654Q&pid=ImgRaw&r=0",
          }}
          style={styles.headerImage}
        >
          {/* Lớp phủ mờ */}
          <View style={styles.overlay} />
          {/* Nội dung header */}
          <View style={styles.headerContent}>
            {/* Nút quay lại */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            {/* Tiêu đề */}
            <Text style={styles.headerTitle}>Cosplayer</Text>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm cosplayer..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Danh sách cosplayer */}
      <Animated.FlatList
        data={filteredCosplayers}
        renderItem={renderCosplayer}
        keyExtractor={(item) => item.AccountId.toString()}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

export default Cosplayer;
