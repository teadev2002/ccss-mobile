import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./MenuSidebarRightStyles";

const MenuSidebarRight = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("User logged out successfully");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color="#510545"
          style={styles.icon}
        />
        <Text style={styles.text}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Contact")}
      >
        <Ionicons name="ticket" size={24} color="#510545" style={styles.icon} />
        <Text style={styles.text}>My Ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Contact")}
      >
        <Ionicons
          name="receipt-outline"
          size={24}
          color="#510545"
          style={styles.icon}
        />
        <Text style={styles.text}> Purchase History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Contact")}
      >
        <Ionicons
          name="mail-outline"
          size={24}
          color="#510545"
          style={styles.icon}
        />
        <Text style={styles.text}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, styles.logout]}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#fff"
          style={styles.icon}
        />
        <Text style={[styles.text, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default MenuSidebarRight;
