import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/ProductDetailStyle";

const ProductDetailModal = ({ visible, onClose, product, onAdd }) => {
  const [inputValue, setInputValue] = useState("1");

  useEffect(() => {
    if (visible) {
      setInputValue("1");
    }
  }, [visible]);

  if (!product) return null;

  const handleAddToCart = () => {
    const quantity = parseInt(inputValue, 10);
    if (!quantity || quantity < 1 || quantity > product.stock) {
      Alert.alert("Invalid Quantity", `Please enter a quantity from 1 to ${product.stock}`);
      return;
    }
    onAdd(product, quantity);
    onClose();
  };

  const increase = () => {
    const current = parseInt(inputValue || "0", 10);
    if (current < product.stock) setInputValue(String(current + 1));
  };

  const decrease = () => {
    const current = parseInt(inputValue || "1", 10);
    if (current > 1) setInputValue(String(current - 1));
  };

  const handleManualChange = (text) => {
    if (/^\d*$/.test(text)) {
      setInputValue(text);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: 
                product.image ||"https://i.pinimg.com/originals/9b/f9/e7/9bf9e73625e302f350b62903b4ecd9fd.jpg" }}
            style={styles.productImage}
          />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
          <Text style={styles.stock}>Available: {product.stock} items</Text>

          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={decrease}>
              <Ionicons name="remove-circle" size={30} color="red" />
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={handleManualChange}
              maxLength={3}
            />
            <TouchableOpacity onPress={increase}>
              <Ionicons name="add-circle" size={30} color="green" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDetailModal;
