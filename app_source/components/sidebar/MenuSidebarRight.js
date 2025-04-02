// import React from "react";
// import { View, Text, TouchableOpacity, Alert } from "react-native";
// import { DrawerContentScrollView } from "@react-navigation/drawer";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import styles from "./MenuSidebarRightStyles";

// const MenuSidebarRight = ({ navigation }) => {
//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("userToken");
//       console.log("User logged out successfully");
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }],
//       });
//     } catch (error) {
//       Alert.alert("Error", "Failed to log out. Please try again.");
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <DrawerContentScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Menu</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.menuItem}
//         onPress={() => navigation.navigate("Profile")}
//       >
//         <Ionicons
//           name="person-outline"
//           size={24}
//           color="#510545"
//           style={styles.icon}
//         />
//         <Text style={styles.text}>My Profile</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.menuItem}
//         onPress={() => navigation.navigate("Contact")}
//       >
//         <Ionicons
//           name="ticket-outline"
//           size={24}
//           color="#510545"
//           style={styles.icon}
//         />
//         <Text style={styles.text}>My Ticket</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.menuItem}
//         onPress={() => navigation.navigate("Contact")}
//       >
//         <Ionicons
//           name="receipt-outline"
//           size={24}
//           color="#510545"
//           style={styles.icon}
//         />
//         <Text style={styles.text}> Purchase History</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.menuItem}
//         onPress={() => navigation.navigate("Contact")}
//       >
//         <Ionicons
//           name="mail-outline"
//           size={24}
//           color="#510545"
//           style={styles.icon}
//         />
//         <Text style={styles.text}>Contact Us</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.menuItem, styles.logout]}
//         onPress={handleLogout}
//       >
//         <Ionicons
//           name="log-out-outline"
//           size={24}
//           color="#fff"
//           style={styles.icon}
//         />
//         <Text style={[styles.text, styles.logoutText]}>Logout</Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// };

// export default MenuSidebarRight;

import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient"; // Thêm LinearGradient
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

      {/* Menu Item: My Profile */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <LinearGradient
          colors={["#510545", "#22668a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color="#fff" // Đổi màu icon thành trắng để nổi trên gradient
            style={styles.icon}
          />
          <Text style={styles.gradientText}>My Profile</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Menu Item: My Ticket */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MyTicket")}
      >
        <LinearGradient
          colors={["#510545", "#22668a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Ionicons
            name="ticket-outline"
            size={24}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.gradientText}>My Ticket</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Menu Item: Purchase History */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Contact")}
      >
        <LinearGradient
          colors={["#510545", "#22668a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Ionicons
            name="receipt-outline"
            size={24}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.gradientText}>Purchase History</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Menu Item: Contact Us */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Contact")}
      >
        <LinearGradient
          colors={["#510545", "#22668a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Ionicons
            name="mail-outline"
            size={24}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.gradientText}>Contact Us</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Menu Item: Logout */}
      <TouchableOpacity
        style={[styles.menuItem, styles.logout]}
        onPress={handleLogout}
      >
        <LinearGradient
          colors={["#510545", "#22668a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.gradientText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default MenuSidebarRight;
