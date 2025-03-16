import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Thêm DrawerNavigator
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Để mở drawer
import Home from "../../screens/HomeScreen/Home.js";
import Noti from "../../screens/NotiScreen/Noti.js";
import Cart from "../../screens/CartScreen/Cart.js";
import MenuSidebarRight from "../sidebar/MenuSidebarRight.js"; // Import MenuSidebarRight

// Component cho Tab Navigator
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Component cho Tab Navigator
const TabNavigator = () => {
  const navigation = useNavigation(); // Dùng để mở drawer

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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "pink",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notify" component={Noti} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen
        name="Menu"
        component={Home} // Component này không quan trọng vì chúng ta sẽ mở drawer
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Ngăn điều hướng đến màn hình "Menu"
            navigation.openDrawer(); // Mở drawer khi nhấn vào tab "Menu"
          },
        }}
      />
    </Tab.Navigator>
  );
};

// Component chính bao gồm DrawerNavigator
const Navigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuSidebarRight {...props} />}
      screenOptions={{
        drawerPosition: "right", // Drawer xuất hiện từ bên phải
        drawerStyle: {
          width: "50%", // Drawer chỉ chiếm 50% màn hình
        },
        headerShown: false, // Ẩn header của Drawer
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default Navigation;
