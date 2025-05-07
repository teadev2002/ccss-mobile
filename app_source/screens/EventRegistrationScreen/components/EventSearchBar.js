import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../EventRegistrationStyles";

const EventSearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for events..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#666"
      />
    </View>
  );
};

export default EventSearchBar;
