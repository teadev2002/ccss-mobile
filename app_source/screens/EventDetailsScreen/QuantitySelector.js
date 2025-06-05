import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-toast-message";

const QuantitySelector = ({ maxQuantity, value, onChange, ticketType, disabled }) => {
  const [quantity, setQuantity] = useState(value || 0);
  const [textValue, setTextValue] = useState(value?.toString() || "0");

  // Ticket type colors
  const ticketColors = {
    0: { // Normal ticket
      background: "#e6f3ff",
      active: "#2196f3",
      disabled: "#90caf9",
    },
    1: { // Premium ticket
      background: "#fff0f5",
      active: "#ff4081",
      disabled: "#f48fb1",
    },
    // Add more ticket types if needed
  };

  const colors = ticketColors[ticketType] || ticketColors[0]; // Fallback to Normal

  // Sync with prop value
  useEffect(() => {
    setQuantity(value || 0);
    setTextValue(value?.toString() || "0");
  }, [value]);

  const handleDecrease = () => {
    if (quantity > 0 && !disabled) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTextValue(newQuantity.toString());
      onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setTextValue(newQuantity.toString());
      onChange(newQuantity);
    } else if (quantity >= maxQuantity) {
      Toast.show({
        type: "error",
        text1: "⚠️ Quantity Exceeded!",
        text2: `Only up to ${maxQuantity} tickets are available.`,
      });
    }
  };

  const handleTextChange = (text) => {
    if (disabled) return;
    if (text === "") {
      setTextValue("");
      return;
    }
    const num = parseInt(text, 10);
    if (!isNaN(num)) {
      setTextValue(text);
    }
  };

  const handleBlur = () => {
    if (disabled) return;
    let num = parseInt(textValue, 10);
    if (isNaN(num) || num < 0) {
      num = 0;
    } else if (num > maxQuantity) {
      num = maxQuantity;
      Toast.show({
        type: "error",
        text1: "⚠️ Quantity Exceeded!",
        text2: `Only up to ${maxQuantity} tickets are available.`,
      });
    }
    setQuantity(num);
    setTextValue(num.toString());
    onChange(num);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.active },
          (quantity === 0 || disabled) && { backgroundColor: colors.disabled, opacity: 0.5 },
        ]}
        onPress={handleDecrease}
        disabled={quantity === 0 || disabled}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityDisplay}>
        <TextInput
          style={[styles.quantityInput, disabled && { color: "#999" }]}
          value={textValue}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          keyboardType="number-pad"
          textAlign="center"
          editable={!disabled}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.active },
          (quantity === maxQuantity || disabled) && { backgroundColor: colors.disabled, opacity: 0.5 },
        ]}
        onPress={handleIncrease}
        disabled={quantity === maxQuantity || disabled}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 8,
    padding: 4,
  },
  button: {
    borderRadius: 6,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityDisplay: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: 60,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityInput: {
    fontSize: 16,
    color: "#333",
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: 0,
  },
};

export default QuantitySelector;