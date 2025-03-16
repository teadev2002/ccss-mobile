import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./app_source/screens/AuthenScreen/Login.js";
import Signup from "./app_source/screens/AuthenScreen/Signup.js"; // Add Signup
import TabNavigator from "./app_source/components/navigator/Navigation.js"; // Updated import
import Profile from "./app_source/screens/ProfileScreen/Profile.js";
import Contact from "./app_source/screens/ContactScreen/Contact.js";
import MenuSidebarRight from "./app_source/components/sidebar/MenuSidebarRight.js";
import Home from "./app_source/screens/HomeScreen/Home.js";
import Cosplayer from "./app_source/screens/CosplayerScreen/Cosplayer.js";

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
          width: width * 0.5,
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
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cosplayer"
              component={Cosplayer}
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
        <StatusBar style="light" backgroundColor="white" translucent />
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
