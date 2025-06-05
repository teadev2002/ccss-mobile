import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    width: "100%",
    justifyContent: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%", // Để ImageBackground khớp với Animated.View
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  footer: {
  padding: 12,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderColor: "#ddd",
},
proceedButton: {
  backgroundColor: "#22668a",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
},
proceedButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemSize: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  itemStatusContainer: {
    alignItems: "flex-end",
  },
  trackButton: {
    backgroundColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartButton: {
    position: "absolute",
    top: 25,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
},

modalContent: {
  width: "90%",
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 15,
  textAlign: "center",
},

modalInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  marginBottom: 10,
},

modalButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},

modalCancelButton: {
  backgroundColor: "#999",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},

modalSubmitButton: {
  backgroundColor: "#22668a",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},

modalButtonText: {
  color: "#fff",
  fontWeight: "bold",
},

modalContentScroll: {
  width: "90%",
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 20,
  maxHeight: "90%",
},

label: {
  marginTop: 10,
  fontWeight: "bold",
},

checkbox: {
  width: 20,
  height: 20,
  borderWidth: 1,
  borderColor: "#666",
  marginRight: 10,
  borderRadius: 4,
},

termsRow: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
},

termsText: {
  fontSize: 14,
},

});

export default styles;
