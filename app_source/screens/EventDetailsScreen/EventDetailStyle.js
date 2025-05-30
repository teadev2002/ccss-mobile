import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  quantityContainer: {
  marginTop: 8,
  marginBottom: 12,
},
picker: {
  height: 40,
  width: 120,
  backgroundColor: "#f0f0f0",
  marginTop: 4,
  marginBottom: 8,
},
quantityInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 6,
  width: 80,
  fontSize: 16,
},
selectText: {
  fontSize: 14,
  marginBottom: 4,
},

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: "#000",
    fontWeight: "bold",
  },
  
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 220,
    marginBottom: 16,
  },

  eventImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "repeat",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "rgba(94, 85, 85, 0.5)", // nền đen mờ
    alignItems: "center",
  },

  eventName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textAlign: "center",
  },

  location: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 2,
  },

  date: {
    fontSize: 14,
    color: "#ccc",
  },
  description: {
    marginTop: 10,
    fontSize: 24,
    textAlign: "center"
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  ticketCard: {
    backgroundColor: "#fff3e6",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  ticketType: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    color: "#e67e22",
    fontWeight: "bold",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
  },

  selectText: {
    fontSize: 16,
    color: "#333", 
    fontWeight: "600",
    
    
  },

  picker: {
    width: 100, 
    height: 60, 
    backgroundColor: "#fff3e6", // Nền sáng cho Picker
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd", // Viền mờ
    paddingHorizontal: 10,
    color: "#333", 
    justifyContent: "center",
  },

  activityCard: {
    backgroundColor: "#e6f7ff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  activityName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  activityDetail: {
    marginTop: 6,
  },
  activityDesc: {
    color: "#333",
  },
  activityNote: {
    color: "#666",
    fontStyle: "italic",
    marginTop: 2,
  },
  totalContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff0f5",
    borderRadius: 10,
    alignItems: "center",
  },

  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e6005c",
  },

  orderButton: {
    backgroundColor: "#ff3399",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  orderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  characterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  characterCardWrapper: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  oddLastCharacter: {
    alignSelf: "center", // tự động căn giữa nếu là item lẻ cuối cùng
  },

  singleCharacterCard: {
    width: "100%", // full width nếu chỉ có 1
  },

  characterImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "contain",
  },

  characterName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    textAlign: "center",
  },

  characterDetail: {
    marginTop: 6,
  },
});

export default styles;
