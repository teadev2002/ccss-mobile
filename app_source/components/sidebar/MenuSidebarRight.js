import React, { useContext, useState } from "react";
import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./MenuSidebarRightStyles";
import CustomButton from "../common/CustomButton";
import color from "../../const/AppColor";
import { AuthContext } from "../../../assets/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const MenuSidebarRight = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [expandedItem, setExpandedItem] = useState(null); // 👈 Thêm state mở rộng

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const MENU_ITEMS = [
    { label: "My Profile", icon: "person-outline", screen: "Profile" },
    {
      label: "My Rental Cosplayer",
      icon: "people-outline",
      screen: "HireHistory",
    },
    {
      label: "My Rental Costume",
      icon: "shirt-outline",
      screen: "MyRentalCostume",
    },
    {
      label: "My Event Organization",
      icon: "calendar-outline",
      screen: "MyEventHistory",
    },
    {
      label: "Purchase History",
      icon: "receipt-outline",
      submenu: [
        {
          label: "Souvenir History",
          icon: "gift-outline",
          screen: "OrderHistoryScreen",
        },
        {
          label: "Ticket History",
          icon: "ticket-outline",
          screen: "MyTicket",
        },
      ],
    },
    { label: "Contact Us", icon: "mail-outline", screen: "Contact" },
  ];

  const handlePressItem = (item) => {
    if (item.submenu) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    } else if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      console.warn("No screen available");
    }
  };

  const handlePressSubItem = (subItem) => {
    if (subItem.screen) {
      navigation.navigate(subItem.screen);
    } else {
      console.warn("No screen for submenu");
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2023/12/04/13/23/ai-generated-8429472_1280.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.accountName}</Text>
        <Text style={styles.useremail}>{user?.email}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.menuWrapper}>
          {MENU_ITEMS.map((item, idx) => (
            <View key={idx}>
              <CustomButton
                title={item.label}
                onPress={() => handlePressItem(item)}
                containerStyle={styles.menuItem}
                gradientStyle={styles.gradientButton}
                textStyle={styles.gradientText}
                icon={<Ionicons name={item.icon} size={22} color="#fff" />}
              />
              {/* Nếu mục đó được mở rộng và có submenu */}
              {expandedItem === item.label && item.submenu && (
                <View style={styles.submenuContainer}>
                  {item.submenu.map((subItem, subIdx) => (
                    <TouchableOpacity
                      key={subIdx}
                      style={styles.submenuButton}
                      onPress={() => handlePressSubItem(subItem)}
                    >
                      <LinearGradient
                        colors={["#510545", "#22668a"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submenuGradient}
                      >
                        <Ionicons
                          name={subItem.icon}
                          size={18}
                          color="#fff"
                          style={styles.submenuIcon}
                        />
                        <Text style={styles.submenuText}>{subItem.label}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Logout */}
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          containerStyle={styles.menuItem}
          gradientStyle={styles.gradientButton}
          textStyle={styles.gradientText}
          colors={color.gradientRed}
          icon={<Ionicons name="log-out-outline" size={22} color="#fff" />}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default MenuSidebarRight;
