// navigation/HireFlowStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HireFlowProvider } from "../../../assets/context/HireFlowContext";

import SelectCharacter from "../../screens/HireCosplayScreen/components/SelectCharacter";
import SelectCosplayer from "../../screens/HireCosplayScreen/components/CharacterCosplayerModal";
import ConfirmRequest from "../../screens/HireCosplayScreen/components/ConfirmRequest";
import SelectTimeForDays from './../../screens/HireCosplayScreen/components/SelectTimeForDays';
import HireCosplay from "../../screens/HireCosplayScreen/HireCosplay";

const Stack = createStackNavigator();

const HireFlowStack = () => {
  return (
    <HireFlowProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HireCosplay" component={HireCosplay} />
        <Stack.Screen name="SelectTimeForDays" component={SelectTimeForDays} />
        <Stack.Screen name="SelectCharacter" component={SelectCharacter} />
        <Stack.Screen name="SelectCosplayer" component={SelectCosplayer} />
        <Stack.Screen name="ConfirmRequest" component={ConfirmRequest} />
      </Stack.Navigator>
    </HireFlowProvider>
  );
};

export default HireFlowStack;
