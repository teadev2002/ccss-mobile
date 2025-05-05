import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomCheckbox from "../../../components/common/CustomCheckBox";
import styles from "../CartStyles";

const CartFooter = ({ totalPrice, selectedCount, selectAll, onToggleSelectAll, onCheckout }) => {
  return (
    <View style={styles.footer}>
      <CustomCheckbox 
        value={selectAll} 
        onValueChange={onToggleSelectAll} 
        checkboxContainerStyle={styles.checkboxContainer}
      />
      <Text style={styles.selectAllText}>Select all items</Text>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Total ({selectedCount} items): ₫{totalPrice.toLocaleString()}
        </Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartFooter;
