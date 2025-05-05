import React from "react";
import { Text as RNText } from "react-native";

const Text = (props) => (
  <RNText {...props} style={[{ fontFamily: "Poppins-BoldItalic" }, props.style]}>
    {props.children}
  </RNText>
);

export default Text;
