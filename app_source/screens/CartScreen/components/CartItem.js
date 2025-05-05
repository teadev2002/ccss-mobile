import React from "react";
import { View, Text, Image } from "react-native";
import CustomCheckbox from "../../../components/common/CustomCheckBox";
import styles from "../CartStyles";

const CartItem = ({ item, isSelected, onToggle }) => {
  return (
    <View style={styles.cartItem}>
      <CustomCheckbox value={isSelected} onValueChange={onToggle} />
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.storeName}>{item.store}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariant}>Variant: {item.variant}</Text>
        <View style={styles.priceQuantity}>
          <Text style={styles.itemPrice}>₫{item.price.toLocaleString()}</Text>
          <Text style={styles.itemQuantity}>x{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
