// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Dimensions } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Login from "./app_source/screens/AuthenScreen/Login.js";
// import Signup from "./app_source/screens/AuthenScreen/Signup.js";
// import TabNavigator from "./app_source/components/navigator/Navigation.js";
// import Profile from "./app_source/screens/ProfileScreen/Profile.js";
// import Contact from "./app_source/screens/ContactScreen/Contact.js";
// import MenuSidebarRight from "./app_source/components/sidebar/MenuSidebarRight.js";
// import Home from "./app_source/screens/HomeScreen/Home.js";
// import Cosplayer from "./app_source/screens/CosplayerScreen/Cosplayer.js";
// import EventOrganization from "./app_source/screens/EventOrganizationScreen/EventOrganization.js"; // Thêm mới
// import CostumeRental from "./app_source/screens/CostumeRentalScreen/CostumeRental.js"; // Thêm mới
// import Souvenirs from "./app_source/screens/SouvenirsScreen/Souvenirs.js"; // Thêm mới
// import EventRegistration from "./app_source/screens/EventRegistrationScreen/EventRegistration.js"; // Thêm mới
// import Cart from "./app_source/screens/CartScreen/Cart.js";
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
// const { width } = Dimensions.get("window");

// function MainDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <MenuSidebarRight {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerPosition: "right",
//         drawerStyle: {
//           width: width * 0.6,
//         },
//         overlayColor: "rgba(0, 0, 0, 0.5)",
//         drawerType: "slide",
//       }}
//     >
//       <Drawer.Screen name="Tabs" component={TabNavigator} />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen
//               name="Login"
//               component={Login}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Signup"
//               component={Signup}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="MainDrawer"
//               component={MainDrawer}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Profile"
//               component={Profile}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Contact"
//               component={Contact}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Home"
//               component={Home}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Cosplayer"
//               component={Cosplayer}
//               options={{
//                 headerShown: false,
//                 presentation: "fullScreenModal",
//               }}
//             />
//             <Stack.Screen
//               name="EventOrganization"
//               component={EventOrganization}
//               options={{
//                 headerShown: false,
//                 presentation: "fullScreenModal",
//               }}
//             />
//             <Stack.Screen
//               name="CostumeRental"
//               component={CostumeRental}
//               options={{
//                 headerShown: false,
//                 presentation: "fullScreenModal",
//               }}
//             />
//             <Stack.Screen name="Cart" component={Cart} />
//             <Stack.Screen
//               name="Souvenirs"
//               component={Souvenirs}
//               options={{
//                 headerShown: false,
//                 presentation: "fullScreenModal",
//               }}
//             />
//             <Stack.Screen
//               name="EventRegistration"
//               component={EventRegistration}
//               options={{
//                 headerShown: false,
//                 presentation: "fullScreenModal",
//               }}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//         <Toast />
//         <StatusBar style="light" backgroundColor="black" translucent />
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./app_source/screens/AuthenScreen/Login.js";
import Signup from "./app_source/screens/AuthenScreen/Signup.js";
import TabNavigator from "./app_source/components/navigator/Navigation.js";
import Profile from "./app_source/screens/ProfileScreen/Profile.js";
import Contact from "./app_source/screens/ContactScreen/Contact.js";
import MenuSidebarRight from "./app_source/components/sidebar/MenuSidebarRight.js";
import Home from "./app_source/screens/HomeScreen/Home.js";
import Cosplayer from "./app_source/screens/CosplayerScreen/Cosplayer.js";
import EventOrganization from "./app_source/screens/EventOrganizationScreen/EventOrganization.js"; // Thêm mới
import CostumeRental from "./app_source/screens/CostumeRentalScreen/CostumeRental.js"; // Thêm mới
import Souvenirs from "./app_source/screens/SouvenirsScreen/Souvenirs.js"; // Thêm mới
import EventRegistration from "./app_source/screens/EventRegistrationScreen/EventRegistration.js"; // Thêm mới
import Cart from "./app_source/screens/CartScreen/Cart.js";
import Onboarding from "./app_source/screens/OnboardingScreen/Onboarding.js"; // Thêm mới
import MyTicket from "./app_source/screens/MyTicketScreen/MyTicket.js"; // Thêm mới
import HireCosplay from "./app_source/screens/HireCosplayScreen/HireCosplay.js";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuSidebarRight {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          width: width * 0.6,
        },
        overlayColor: "rgba(0, 0, 0, 0.5)",
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainDrawer"
              component={MainDrawer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Contact"
              component={Contact}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyTicket"
              component={MyTicket}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cosplayer"
              component={Cosplayer}
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="EventOrganization"
              component={EventOrganization}
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="CostumeRental"
              component={CostumeRental}
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen
              name="Souvenirs"
              component={Souvenirs}
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="EventRegistration"
              component={EventRegistration}
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="HireCosplay"
              component={HireCosplay}
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
        <StatusBar style="light" backgroundColor="black" translucent />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
