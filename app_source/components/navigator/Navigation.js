import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Home from "../../screens/HomeScreen/Home.js";
import Noti from "../../screens/NotiScreen/Noti.js";
import Cart from "../../screens/CartScreen/Cart.js";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notify") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "menu" : "menu-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "royalblue",
        tabBarInactiveTintColor: "navy",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notify" component={Noti} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen
        name="Menu"
        component={Home} // Placeholder; opens drawer instead
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
