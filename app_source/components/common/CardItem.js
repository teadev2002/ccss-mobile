import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../../const/AppColor"; 

const CardItem = ({ title, icon, onPress, containerStyle, textStyle }) => {
  return (
    <LinearGradient
        colors={Color.gradientDefault}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={containerStyle}
    >
      <TouchableOpacity onPress={onPress}>
        <Text style={textStyle}>{icon}</Text>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CardItem;
