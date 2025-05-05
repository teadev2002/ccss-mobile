import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./SouvenirsStyles";
import useSouvenirProducts from "../../hooks/useSurvenirProduct";
import { AuthContext } from "../../../assets/context/AuthContext";
import ProductDetailModal from "./components/ProductDetailModal";

const Souvenirs = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const { user } = useContext(AuthContext);
  const accountId = user?.id;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { productItems, cartCount, loading, handleAddToCart, stockMap } =
    useSouvenirProducts(accountId, searchText);

  const filteredItems = productItems.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = (item) => {
    if (!item.quantity || item.quantity <= 0) {
      Alert.alert("Out of stock", "This product is sold out!");
      return;
    }
    setSelectedProduct({ ...item, stock: stockMap[item.id] });
    setShowModal(true);
  };

  const renderItem = ({ item }) => {
    const isOutOfStock = stockMap[item.id] <= 0;

    return (
      <View style={styles.productContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/9b/f9/e7/9bf9e73625e302f350b62903b4ecd9fd.jpg", // placeholder
          }}
          style={styles.productImage}
        />
        {isOutOfStock && (
          <View style={styles.outOfStockTag}>
            <Text style={styles.outOfStockText}>Out of stock</Text>
          </View>
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productStock}>
            Stock: {stockMap[item.id]} items
          </Text>
          <View style={styles.priceAdd}>
            <Text style={styles.productPrice}>
              {item.price.toLocaleString()}đ
            </Text>
            <TouchableOpacity
              onPress={() => handleAdd(item)}
              disabled={isOutOfStock}
              style={isOutOfStock ? { opacity: 0.4 } : {}}
            >
              <Ionicons name="add-circle" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header đứng yên */}
      <View style={styles.headerBackground}>
        <ImageBackground
          source={{
            uri: "https://nintendoeverything.com/wp-content/uploads/Pokemon-Center-7/9/16/pokemon-center-7.jpg",
          }}
          style={styles.headerImage}
          imageStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Souvenirs</Text>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart" size={24} color="#fff" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Nội dung scroll */}
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading products...</Text>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No products found</Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <ProductDetailModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onAdd={(product, qty) => handleAddToCart(product, qty)}
      />
    </View>
  );
};

export default Souvenirs;
