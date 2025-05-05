import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../../const/AppColor";

const CustomButton = ({
  title,
  onPress,
  gradientStyle,
  textStyle,
  containerStyle,
  colors = Color.gradientDefault,
  icon, 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={gradientStyle}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {icon && <View style={{ marginRight: 12 }}>{icon}</View>}
          <Text style={textStyle}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
