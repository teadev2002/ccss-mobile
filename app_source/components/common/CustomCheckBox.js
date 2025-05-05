import React from "react";
import { TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomCheckbox = ({ value, onValueChange , checkboxContainerStyle }) => (
  <TouchableOpacity onPress={onValueChange} style={checkboxContainerStyle}>
    {value ? (
      <Ionicons name="checkbox" size={24} color="royalblue" />
    ) : (
      <Ionicons name="square-outline" size={24} color="#888" />
    )}
  </TouchableOpacity>
);

export default CustomCheckbox;
