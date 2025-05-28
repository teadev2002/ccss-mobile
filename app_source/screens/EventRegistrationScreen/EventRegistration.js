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

  console.log("EventRegistration render", JSON.stringify(eventItems, null, 2));
  

  // Lọc và sắp xếp sự kiện
  const filteredItems = eventItems.filter((item) =>
  item.eventName.toLowerCase().includes(searchText.toLowerCase())
);

const upcomingEvents = filteredItems
  .filter((item) => item.status === 0)
  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

const ongoingEvents = filteredItems
  .filter((item) => item.status === 2)
  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

const endedEvents = filteredItems
  .filter((item) => item.status === 3)
  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

const inactiveEvents = filteredItems
  .filter((item) => item.status === 1);



  return (
    <View style={styles.container}>
      <EventHeader navigation={navigation} />

      <View style={styles.content}>
        <EventSearchBar searchText={searchText} setSearchText={setSearchText} />

        <FlatList
  ListHeaderComponent={
    <>
      {ongoingEvents.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Ongoing Events</Text>
          {ongoingEvents.map((item) => (
            <EventItem key={item.eventId} item={item} navigation={navigation} />
          ))}
        </>
      )}

      {upcomingEvents.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((item) => (
            <EventItem key={item.eventId} item={item} navigation={navigation} />
          ))}
        </>
      )}

      {endedEvents.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Ended Events</Text>
          {endedEvents.map((item) => (
            <EventItem key={item.eventId} item={item} navigation={navigation} />
          ))}
        </>
      )}

      {inactiveEvents.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Inactive Events</Text>
          {inactiveEvents.map((item) => (
            <EventItem key={item.eventId} item={item} navigation={navigation} />
          ))}
        </>
      )}
    </>
  }
  data={[]} // để tránh lỗi FlatList, data có thể để rỗng vì dùng ListHeaderComponent để custom
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
