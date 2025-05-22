import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  characterCardGrid: {
    width: "48%",
    backgroundColor: "#f0f4f8",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "#e6f0ff",
  },
  characterImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  characterName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    marginBottom: 2,
  },
  characterDesc: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },

  qtySymbol: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  qtyInput: {
    width: 50,
    height: 32,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    textAlign: "center",
    marginHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },

  characterPrice: {
    fontSize: 12,
    color: "#888",
  },
  dropdownWrapper: {
    marginTop: 8,
    zIndex: 1000,
  },
  dropdownLabel: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 14,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 8,
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    minHeight: 36,
  },
  dropdownListContainer: {
    borderColor: "#ccc",
    borderRadius: 8,
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownItem: {
    height: 36,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: 24,
  },
  footerButtons: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
},

actionButton: {
  flex: 1,
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  marginHorizontal: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

backButton: {
  backgroundColor: "#aaa",
},

nextButton: {
  flex: 1,
  backgroundColor: "#4CAF50", // Màu xanh hiện đại
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  alignItems: "center",
  marginLeft: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 3,
},

actionButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

});
