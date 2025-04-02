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
import styles from "./EventRegistrationStyles";

const EventRegistration = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current; // Thêm Animated.Value để theo dõi cuộn

  const eventItems = [
    {
      EventId: "1",
      EventName: "Cosplay Con Warsaw",
      Description: "Annual cosplay convention with competitions and workshops.",
      Location: "Warsaw, Poland",
      IsActive: true,
      StartDate: "2025-09-12",
      EndDate: "2025-09-14",
      CreateDate: "2025-03-01",
      UpdateDate: "2025-03-15",
      CreateBy: "Admin1",
      Price: ["$40", "$50"],
      Image:
        "https://www.mmogames.com/wp-content/uploads/2018/05/blizzcon-cosplayer-army.jpg",
    },
    {
      EventId: "2",
      EventName: "Anime Expo  ",
      Description: "Large-scale cosplay event with parades and panels.",
      Location: "Tokyo, Japan",
      IsActive: true,
      StartDate: "2025-02-09",
      EndDate: "2025-09-15",
      CreateDate: "2025-03-02",
      UpdateDate: "2025-03-10",
      CreateBy: "Admin2",
      Price: ["$40", "$50"],
      Image:
        "https://edmidentity.com/wp-content/uploads/2019/02/Mysteryland-2018-Mainstage-Day-01-696x464.jpg",
    },
    {
      EventId: "3",
      EventName: "Hoyo Fest",
      Description:
        "International cosplay championship with global participants.",
      Location: "Seoul, South Korea",
      IsActive: true,
      StartDate: "2025-01-07",
      EndDate: "2025-09-17",
      CreateDate: "2025-03-04",
      UpdateDate: "2025-03-14",
      CreateBy: "Admin4",
      Price: ["$50", "$65"],
      Image:
        "https://www.playcubic.com/wp-content/uploads/2022/10/hoyo-fest-2022-banner.jpg",
    },
    {
      EventId: "4",
      EventName: "Cosplay Con Warsaw",
      Description: "Annual cosplay convention with competitions and workshops.",
      Location: "Warsaw, Poland",
      IsActive: true,
      StartDate: "2025-09-12",
      EndDate: "2025-09-14",
      CreateDate: "2025-03-01",
      UpdateDate: "2025-03-15",
      CreateBy: "Admin1",
      Price: ["$40", "$50"],
      Image:
        "https://www.mmogames.com/wp-content/uploads/2018/05/blizzcon-cosplayer-army.jpg",
    },
    {
      EventId: "5",
      EventName: "Anime Expo  ",
      Description: "Large-scale cosplay event with parades and panels.",
      Location: "Tokyo, Japan",
      IsActive: true,
      StartDate: "2025-02-09",
      EndDate: "2025-09-15",
      CreateDate: "2025-03-02",
      UpdateDate: "2025-03-10",
      CreateBy: "Admin2",
      Price: ["$40", "$50"],
      Image:
        "https://edmidentity.com/wp-content/uploads/2019/02/Mysteryland-2018-Mainstage-Day-01-696x464.jpg",
    },
    {
      EventId: "6",
      EventName: "Hoyo Fest",
      Description:
        "International cosplay championship with global participants.",
      Location: "Seoul, South Korea",
      IsActive: true,
      StartDate: "2025-01-07",
      EndDate: "2025-09-17",
      CreateDate: "2025-03-04",
      UpdateDate: "2025-03-14",
      CreateBy: "Admin4",
      Price: ["$50", "$65"],
      Image:
        "https://www.playcubic.com/wp-content/uploads/2022/10/hoyo-fest-2022-banner.jpg",
    },
    {
      EventId: "7",
      EventName: "Cosplay Con Warsaw",
      Description: "Annual cosplay convention with competitions and workshops.",
      Location: "Warsaw, Poland",
      IsActive: true,
      StartDate: "2025-09-12",
      EndDate: "2025-09-14",
      CreateDate: "2025-03-01",
      UpdateDate: "2025-03-15",
      CreateBy: "Admin1",
      Price: ["$40", "$50"],
      Image:
        "https://www.mmogames.com/wp-content/uploads/2018/05/blizzcon-cosplayer-army.jpg",
    },
    {
      EventId: "8",
      EventName: "Anime Expo  ",
      Description: "Large-scale cosplay event with parades and panels.",
      Location: "Tokyo, Japan",
      IsActive: true,
      StartDate: "2025-02-09",
      EndDate: "2025-09-15",
      CreateDate: "2025-03-02",
      UpdateDate: "2025-03-10",
      CreateBy: "Admin2",
      Price: ["$40", "$50"],
      Image:
        "https://edmidentity.com/wp-content/uploads/2019/02/Mysteryland-2018-Mainstage-Day-01-696x464.jpg",
    },
    {
      EventId: "9",
      EventName: "Hoyo Fest",
      Description:
        "International cosplay championship with global participants.",
      Location: "Seoul, South Korea",
      IsActive: true,
      StartDate: "2025-01-07",
      EndDate: "2025-09-17",
      CreateDate: "2025-03-04",
      UpdateDate: "2025-03-14",
      CreateBy: "Admin4",
      Price: ["$50", "$65"],
      Image:
        "https://www.playcubic.com/wp-content/uploads/2022/10/hoyo-fest-2022-banner.jpg",
    },
  ];

  // Filter events based on search text and only active items
  const filteredItems = eventItems.filter(
    (item) =>
      item.IsActive &&
      item.EventName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Tạo hiệu ứng thu nhỏ header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }) => {
    const date = item.StartDate.split("-")[2]; // Extract day from YYYY-MM-DD
    const month = item.StartDate.split("-")[1]; // Extract month from YYYY-MM-DD

    return (
      <View style={styles.eventContainer}>
        <ImageBackground
          source={{ uri: item.Image }}
          style={styles.eventImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.dateContainer}>
            <Text style={styles.dateMonth}>{month}</Text>
            <Text style={styles.dateDay}>{date}</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventName}>{item.EventName}</Text>
            <Text style={styles.eventPrice}>{item.Price.join(" - ")}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header động */}
      <Animated.View
        style={[styles.headerBackground, { height: headerHeight }]}
      >
        <ImageBackground
          source={{
            uri: "https://th.bing.com/th/id/R.3e5d12372d58e6496f9f84cada9e70b9?rik=w%2fsbUtrmip%2b7oA&pid=ImgRaw&r=0",
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
            <Text style={styles.headerTitle}>Buy Ticket Event</Text>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("MyTicket")}
            >
              <Ionicons name="ticket-outline" size={24} color="#fff" />
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
            placeholder="Search for events..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
        {/* List of events */}
        <Animated.FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.EventId}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No events found</Text>
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

export default EventRegistration;
