import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CartStyles.js";

const cartData = {
  CartId: "C001",
  AccountId: "A001",
  TotalPrice: 448000, // Tổng giá (2 sản phẩm, mỗi sản phẩm 224000)
  CreateDate: "2025-03-16T09:00:00Z",
  UpdateDate: "2025-03-16T09:30:00Z",
  items: [
    {
      id: "1",
      store: "CCSS COSMETICS OFFICIAL",
      name: "Móc Khóa Goku",
      variant: "Pink Tone",
      price: 224000,
      quantity: 2,
      image: "https://via.placeholder.com/80", // Placeholder cho hình ảnh
    },
    {
      id: "2",
      store: "CCSS Official Store",
      name: "Poster Nảuto",
      variant: "Black",
      price: 108933,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ],
};

// Custom Checkbox Component
const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={onValueChange} style={styles.checkboxContainer}>
    {value ? (
      <Ionicons name="checkbox" size={24} color="#FF6347" />
    ) : (
      <Ionicons name="square-outline" size={24} color="#888" />
    )}
  </TouchableOpacity>
);

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [voucherSelected, setVoucherSelected] = useState(false);

  // Chọn/bỏ chọn sản phẩm
  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Chọn tất cả
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartData.items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Tính tổng giá của các sản phẩm được chọn
  const calculateTotalPrice = () => {
    return cartData.items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <CustomCheckbox
        value={selectedItems.includes(item.id)}
        onValueChange={() => toggleItemSelection(item.id)}
      />
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.storeName}>{item.store}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariant}>Phân loại: {item.variant}</Text>
        <View style={styles.priceQuantity}>
          <Text style={styles.itemPrice}>₫{item.price.toLocaleString()}</Text>
          <Text style={styles.itemQuantity}>x{item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Giỏ hàng</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Đừng bỏ lỡ FreeShip mọi đơn + CCSS Voucher
        </Text>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={cartData.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Voucher */}
      <View style={styles.voucherSection}>
        <CustomCheckbox
          value={voucherSelected}
          onValueChange={setVoucherSelected}
        />
        <Text style={styles.voucherText}>Voucher giảm tới 1Đ</Text>
        <Text style={styles.voucherStore}>CCSS Official Store</Text>
      </View>

      {/* Footer (Thanh toán) */}
      <View style={styles.footer}>
        <CustomCheckbox value={selectAll} onValueChange={toggleSelectAll} />
        <Text style={styles.selectAllText}>Chọn tất cả sản phẩm</Text>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            Tổng thanh toán ({selectedItems.length}Đ): ₫
            {calculateTotalPrice().toLocaleString()}
          </Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Mua hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;
