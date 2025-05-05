import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SouvenirsStyles';

const SearchBar = ({ searchText, setSearchText }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search for products..."
      value={searchText}
      onChangeText={setSearchText}
      placeholderTextColor="#666"
    />
  </View>
);

export default SearchBar;
