import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./EventRegistrationStyles";
import EventHeader from "./components/EventHeader";
import EventSearchBar from "./components/EventSearchBar";
import EventItem from "./components/EventItem";
import useFetchFestivals from "../../hooks/useFetchFestivals";
import useAuthToken from "../../hooks/userAuthToken";

const EventRegistration = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const token = useAuthToken();

  const { eventItems } = useFetchFestivals();
  const now = new Date();

  // Lọc và sắp xếp sự kiện
  const sortedItems = [...eventItems]
    .filter((item) => item.isActive && item.eventName.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      const aDate = new Date(a.startDate);
      const bDate = new Date(b.startDate);
      const aIsPast = aDate < now;
      const bIsPast = bDate < now;

      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;

      if (!aIsPast && !bIsPast) {
        return aDate - bDate; // Sắp tới: tăng dần
      }
      return bDate - aDate; // Đã qua: giảm dần
    });

  return (
    <View style={styles.container}>
      {/* Header đứng yên */}
      <EventHeader navigation={navigation} />

      <View style={styles.content}>
        <EventSearchBar searchText={searchText} setSearchText={setSearchText} />

        <FlatList
          data={sortedItems}
          renderItem={({ item }) => <EventItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.eventId}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No events found</Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default EventRegistration;
