import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  banner: {
    backgroundColor: "#FFE4CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  bannerText: {
    fontSize: 14,
    color: "#000",
  },
  cartItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  itemDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    color: "#888",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  itemVariant: {
    fontSize: 14,
    color: "#888",
  },
  priceQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "royalblue",
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#000",
  },
  voucherSection: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  voucherText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
  voucherStore: {
    fontSize: 14,
    color: "#888",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectAllText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
  totalPriceContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  totalPriceText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "royalblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
});

export default styles;
