import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./CartStyles";
import useCart from "../../hooks/useCart";
import SelectPaymentModal from "../../components/common/SelectPaymentModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import PaymentPurpose from "../../const/PaymentPurpose";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../../assets/context/AuthContext";

const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={onValueChange} style={styles.checkboxContainer}>
    <Ionicons
      name={value ? "checkbox" : "square-outline"}
      size={24}
      color={value ? "royalblue" : "#888"}
    />
  </TouchableOpacity>
);

const Cart = () => {
  const {
    cartItems,
    cartId,
    isLoading,
    updateQuantity,
    deleteItems,
    confirmPayment,
    accountId,
    createOrder,
  } = useCart();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [voucherSelected, setVoucherSelected] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const handleDeepLink = (event) => {
        const url = event.url;
        if (url?.includes("payment-success")) {
          Toast.show({ type: "success", text1: "Payment Successful!" });
          navigation.navigate("Home");
        } else if (url?.includes("payment-failed")) {
          Toast.show({ type: "error", text1: "Payment Failed!" });
        }
      };

      const linkingSubscription = Linking.addEventListener("url", handleDeepLink);
      return () => linkingSubscription.remove();
    }, [])
  );

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectAll((prev) => {
      const newSelectAll = !prev;
      setSelectedItems(newSelectAll ? cartItems.map((item) => item.cartProductId) : []);
      return newSelectAll;
    });
  };

  const increaseQuantity = (item) => {
    if (item.quantity >= item.stockQuantity) {
      Alert.alert("Out of stock", "You cannot add more than available stock.");
      return;
    }
    updateQuantity(item.cartProductId, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.cartProductId, item.quantity - 1);
    }
  };

  const handleDeleteItem = (cartId, ids) => {
    deleteItems(ids);
  };

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.cartProductId))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmPayment = async () => {
    setShowConfirmationModal(false);
    try {
      const orderPaymentId = await createOrder(selectedItems);
      if (!orderPaymentId) {
        Alert.alert("Error", "Could not create order. Please try again.");
        return;
      }

      const paymentData = {
        fullName: user.accountName,
        orderInfo: "Cart Checkout",
        amount: calculateTotalPrice(),
        purpose: PaymentPurpose.SHOPPING,
        accountId: accountId,
        accountCouponId: null,
        ticketId: null,
        ticketQuantity: null,
        contractId: null,
        orderpaymentId: orderPaymentId,
        isWeb: false,
      };

      await confirmPayment(selectedPaymentMethod, paymentData, navigation);
    } catch (error) {
      Alert.alert("Payment Error", "An error occurred. Please try again.");
      console.error("❌ Payment Error:", error);
    }
  };

  const handleCancelPayment = () => {
    setShowConfirmationModal(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <CustomCheckbox
        value={selectedItems.includes(item.cartProductId)}
        onValueChange={() => toggleItemSelection(item.cartProductId)}
      />
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.storeName}>{item.store}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariant}>Type: {item.variant}</Text>
        <Text style={styles.stockText}>Stock: {item.stockQuantity} items</Text>
        <View style={styles.priceQuantity}>
          <Text style={styles.itemPrice}>₫{item.price.toLocaleString()}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => decreaseQuantity(item)}>
              <Ionicons name="remove-circle-outline" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item)}>
              <Ionicons name="add-circle-outline" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteItem(cartId, [item.cartProductId])}
        style={styles.deleteIcon}
      >
        <Ionicons name="trash-outline" size={22} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>Don't miss FreeShip + CCSS Voucher</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="royalblue" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.cartProductId}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
              Your cart is empty.
            </Text>
          }
        />
      )}

      <View style={styles.voucherSection}>
        <CustomCheckbox
          value={voucherSelected}
          onValueChange={() => setVoucherSelected((prev) => !prev)}
        />
        <Text style={styles.voucherText}>1Đ discount voucher</Text>
        <Text style={styles.voucherStore}>CCSS Official Store</Text>
      </View>

      <View style={styles.footer}>
        <CustomCheckbox value={selectAll} onValueChange={toggleSelectAll} />
        <Text style={styles.selectAllText}>Select all products</Text>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            Total ({selectedItems.length} items): ₫{calculateTotalPrice().toLocaleString()}
          </Text>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              { opacity: selectedItems.length === 0 ? 0.5 : 1 },
            ]}
            disabled={selectedItems.length === 0}
            onPress={() => setShowPaymentModal(true)}
          >
            <Text style={styles.checkoutButtonText}>Check out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SelectPaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectPaymentMethod={handleSelectPaymentMethod}
      />

      <ConfirmationModal
        visible={showConfirmationModal}
        onClose={handleCancelPayment}
        onConfirm={handleConfirmPayment}
        paymentMethod={selectedPaymentMethod}
      />
    </View>
  );
};

export default Cart;
