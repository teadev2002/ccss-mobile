import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Text, View, ActivityIndicator } from "react-native";
import fonts from "../../app_source/const/AppFont"; 

export default function CustomFontProvider({ children }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync(fonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}
