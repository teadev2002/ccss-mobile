import { useState, useEffect, useCallback, useContext } from "react";
import { Linking, Alert } from "react-native";
import PaymentService from "../apiServices/paymentService/paymentService";
import cartService from "../apiServices/cartService/CartService";
import orderService from "../apiServices/orderService/orderService";
import { AuthContext } from "../../assets/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getAccountId = async () => {
      const id = user?.id;
      setAccountId(id);
    };
    getAccountId();
  }, []);

  const fetchCart = useCallback(async () => {
    if (!accountId) return;
    try {
      setIsLoading(true);
      const cart = await cartService.getCartByAccountId(accountId);
      if (!cart) {
        setCartItems([]);
        setCartId(null);
        return;
      }

      const items = await Promise.all(
        cart?.listCartProduct?.map(async (item) => {
          const product = await cartService.getProductById(item.productId);
          return {
            cartProductId: item.cartProductId,
            store: "CCSS Store",
            name: product?.productName || "Product",
            variant: product?.variant || "Default",
            price: item.price,
            quantity: item.quantity,
            image: product?.urlImage || "https://via.placeholder.com/100",
            productId: item.productId,
            stockQuantity: product?.quantity || 0,
          };
        }) || []
      );
      setCartItems(items);
      setCartId(cart.cartId);
    } catch (error) {
      console.error("❌ Lỗi khi lấy giỏ hàng:", error);
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (cartProductId, newQuantity) => {
    try {
      await cartService.updateProductQuantity(cartId, [
        { cartProductId, quantity: newQuantity },
      ]);
      await AsyncStorage.setItem("cart_changed", "true");
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartProductId === cartProductId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật số lượng:", err);
    }
  };

  const deleteItems = async (cartProductIds) => {
    try {
      const payload = cartProductIds.map((id) => ({ cartProductId: id }));
      await cartService.removeProductFromCart(cartId, payload);
      await AsyncStorage.setItem("cart_changed", "true");
      setCartItems((prev) =>
        prev.filter((item) => !cartProductIds.includes(item.cartProductId))
      );
    } catch (error) {
      console.error("❌ Lỗi khi xóa sản phẩm:", error);
    }
  };

  const confirmPayment = async (method, paymentData, navigation) => {
    try {
      let result;

      if (method === "Momo") {
        result = await PaymentService.createMomoPayment(paymentData);
      } else if (method === "VNPay") {
        result = await PaymentService.createVnpayPayment(paymentData);
      }

      if (result?.url) {
        navigation.navigate("PaymentWebviewScreen", { paymentUrl: result.url });
      } else {
        Alert.alert("Không thể tạo link thanh toán", "Vui lòng thử lại sau.");
      }
    } catch (err) {
      Alert.alert("Lỗi thanh toán", err.message);
    }
  };

  const createOrder = async (selectedItems, data) => {
    const selectedCart = cartItems
      .filter((item) => selectedItems.includes(item.cartProductId))
      .map((item) => ({
        ...item,
        productId: item.productId,
      }));

    if (selectedCart.length === 0) {
      Alert.alert("Lỗi", "Không có sản phẩm nào được chọn để thanh toán.");
      console.log("❌ Không có sản phẩm hợp lệ trong giỏ hàng");
      return null;
    }

    const orderData = {
      accountId: accountId,
      address: data.address || "Chưa cập nhật",
      phone: data.phone || "Chưa cập nhật",
      description: data.description || "Chưa cập nhật",
      to_district_id: data.to_district_id || "Chưa cập nhật",
      to_ward_code: data.to_ward_code || "Chưa cập nhật",
      orderProducts: selectedCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        createDate: new Date().toISOString(),
      })),
    };

    try {
      const result = await orderService.createOrder(orderData);

      if (result) {
        return result;
      } else {
        Alert.alert("Lỗi", "Không nhận được mã thanh toán từ server.");
        return null;
      }
    } catch (error) {
      Alert.alert("Lỗi", "Tạo đơn hàng thất bại.");
      return null;
    }
  };

  return {
    cartItems,
    isLoading,
    cartId,
    updateQuantity,
    deleteItems,
    fetchCart,
    confirmPayment,
    accountId,
    createOrder,
  };
};

export default useCart;
