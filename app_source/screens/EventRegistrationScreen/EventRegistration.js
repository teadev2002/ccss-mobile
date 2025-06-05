// Trong EventRegistration.js
import React, { useState } from "react";
import { View, FlatList, Text, RefreshControl, ActivityIndicator } from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);
  const token = useAuthToken();
  const { eventItems, isLoading, fetchEvents } = useFetchFestivals();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

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
        {isLoading ? (
          <ActivityIndicator size="large" color="royalblue" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            ListHeaderComponent={
              <>
                {ongoingEvents.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Ongoing Festival</Text>
                    {ongoingEvents.map((item) => (
                      <EventItem key={item.eventId} item={item} navigation={navigation} />
                    ))}
                  </>
                )}
                {upcomingEvents.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Upcoming Festival</Text>
                    {upcomingEvents.map((item) => (
                      <EventItem key={item.eventId} item={item} navigation={navigation} />
                    ))}
                  </>
                )}
                {endedEvents.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Ended Festival</Text>
                    {endedEvents.map((item) => (
                      <EventItem key={item.eventId} item={item} navigation={navigation} />
                    ))}
                  </>
                )}
                {inactiveEvents.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Inactive Festival</Text>
                    {inactiveEvents.map((item) => (
                      <EventItem key={item.eventId} item={item} navigation={navigation} />
                    ))}
                  </>
                )}
              </>
            }
            data={[]}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No events found</Text>
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default EventRegistration;