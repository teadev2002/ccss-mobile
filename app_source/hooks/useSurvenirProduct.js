import { useState, useEffect, useCallback } from "react";
import productServices from "../apiServices/productService/productService";
import cartServices from "../apiServices/cartService/CartService";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { alert } from "../../assets/context/AlertHelper";

const useSouvenirProducts = (accountId, searchText) => {
  const [productItems, setProductItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stockMap, setStockMap] = useState({});

  useFocusEffect(
    useCallback(() => {
      const checkCartChange = async () => {
        const cartChanged = await AsyncStorage.getItem('cart_changed');
        if (cartChanged === 'true') {
          await fetchProductsAndCart();
          await AsyncStorage.setItem('cart_changed', 'false');
        }
      };
  
      checkCartChange();
    }, [accountId])
  );

  const fetchProductsAndCart = async () => {
  try {
    setLoading(true);
    const [products, cart] = await Promise.all([
      productServices.getCombinedProductData(),
      accountId ? cartServices.getCartByAccountId(accountId) : null,
    ]);

    setProductItems(products);
    const stockData = {};
    products.forEach((product) => {
      // Chỉ lấy stock gốc từ product.quantity, không trừ quantityInCart
      stockData[product.id] = product.quantity || 0;
    });

    setStockMap(stockData);
  } catch (error) {
    console.error("Failed to fetch products or cart", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProductsAndCart();
  }, [searchText, accountId]);

  useFocusEffect(
    useCallback(() => {
      const fetchCartCount = async () => {
        if (!accountId) return;
        try {
          const cart = await cartServices.getCartByAccountId(accountId);
          const count =
            cart?.listCartProduct?.reduce(
              (total, item) => total + item.quantity,
              0
            ) || 0;
          setCartCount(count);
        } catch (error) {
          console.error("Error fetching cart count:", error);
          setCartCount(0);
        }
      };
      fetchCartCount();
    }, [accountId])
  );

  const handleAddToCart = async (product, quantity) => {
  if (!accountId) {
    console.warn("No accountId found");
    return;
  }

  try {
    await cartServices.createCart(accountId);

    const cart = await cartServices.getCartByAccountId(accountId);
    const cartId = cart.cartId;

    const existingItem = cart.listCartProduct?.find(
      (item) => item.productId === product.id
    );
    const quantityInCart = existingItem?.quantity || 0;
    const availableStock = stockMap[product.id] || 0;

    // Kiểm tra tồn kho trước khi add
    if (quantityInCart + quantity > availableStock) {
      Alert.alert(
        "Out of Stock",
        "Not enough stock to add more of this product."
      );
      return;
    }

    const productData = [{ productId: product.id, quantity: quantity }];
    await cartServices.addProductToCart(cartId, productData);

    // Không cập nhật stockMap trên UI
    // Xóa dòng này: 
    // setStockMap((prev) => ({
    //   ...prev,
    //   [product.id]: (prev[product.id] || 0) - quantity,
    // }));

    Alert.alert("Success", "Product added to cart!");
    setCartCount((prev) => prev + quantity);
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    Alert.alert("Error", "Failed to add product to cart.");
  }
};

  return {
    productItems,
    cartCount,
    loading,
    handleAddToCart,
    stockMap,
  };
};

export default useSouvenirProducts;
