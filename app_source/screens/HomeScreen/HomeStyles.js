//sua
// import { StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const HomeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   profileImage: {
//     width: 20,
//     height: 20,
//     borderRadius: 75,
//     margin: 10,
//   },
//   // Carousel Styles
//   carouselItem: {
//     width: width,
//     height: 300,
//   },
//   carouselImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   carouselCaption: {
//     position: "absolute",
//     bottom: 20,
//     left: "10%",
//     right: "10%",
//     padding: 20,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   carouselTitle: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#fff",
//     textShadowColor: "rgba(0, 0, 0, 0.5)",
//     textShadowOffset: { width: 0, height: 3 },
//     textShadowRadius: 10,
//   },
//   carouselDescription: {
//     fontSize: 16,
//     fontWeight: "400",
//     color: "#e0e0e0",
//     textAlign: "center",
//   },
//   // Featured Characters Styles
//   featuredCharacters: {
//     paddingTop: 20,
//     paddingBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#510545",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   characterCard: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 12 },
//     shadowOpacity: 0.15,
//     shadowRadius: 30,
//     elevation: 10,
//   },
//   characterImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 50,
//     resizeMode: "cover",
//   },
//   characterContent: {
//     // position: "absolute",
//     // bottom: 0,
//     // left: 0,
//     // right: 0,
//     // padding: 15,
//     // borderBottomLeftRadius: 15,
//     // borderBottomRightRadius: 15,
//   },
//   characterName: {
//     // fontSize: 18,
//     // fontWeight: "700",
//     // color: "#fff",
//     // textShadowColor: "rgba(0, 0, 0, 0.3)",
//     // textShadowOffset: { width: 0, height: 2 },
//     // textShadowRadius: 6,
//   },
//   categoryBadge: {
//     fontSize: 14,
//     color: "#fff",
//     backgroundColor: "#f85caa",
//     paddingVertical: 3,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginTop: 5,
//   },
//   // Featured Services Styles

//   serviceDescription: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//   },
//   // Featured Services Styles
//   featuredServices: {
//     padding: 20,
//   },
//   serviceList: {
//     flexDirection: "column", // Stack buttons vertically
//   },
//   serviceCard: {
//     marginBottom: 15, // Space between buttons
//   },
//   serviceButton: {
//     borderRadius: 50, // Rounded corners
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.9,
//     shadowRadius: 10,
//     elevation: 15, // Shadow for Android
//   },
//   serviceButtonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   iconWrapper: {
//     width: 52,
//     height: 52,
//     borderRadius: 50,
//     backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly transparent white background for the icon
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 14,
//   },
//   serviceTitle: {
//     flex: 1, // Take up remaining space
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#fff", // White text to contrast with the gradient background
//     textAlign: "left",
//   },
//   viewAllButton: {
//     alignSelf: "center",
//     marginTop: 10,
//     borderRadius: 30, // Giữ bo góc từ trước
//     overflow: "hidden", // Đảm bảo gradient không tràn ra ngoài
//     shadowColor: "black",
//     shadowOffset: { width: 20, height: 20 }, // Tăng offset để bóng xa hơn
//     shadowOpacity: 1, // Độ tối tối đa
//     shadowRadius: 50, // Bán kính bóng lớn để lan rộng
//     elevation: 50, // Tăng elevation tối đa cho Android
//   },
//   gradientButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   viewAllText: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#fff",
//   },
// });

// export default HomeStyles;

// welcome
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Welcome Section Styles
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 50,
    elevation: 10,
  },
  welcomeAvatar: {
    marginRight: 15,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  welcomeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  // Carousel Styles
  carouselItem: {
    width: width,
    height: 250,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselCaption: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  carouselTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  carouselDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: "#e0e0e0",
    textAlign: "center",
  },
  // Featured Characters Styles
  featuredCharacters: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#510545",
    textAlign: "center",
    marginVertical: 10,
  },
  characterCard: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  characterImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "cover",
  },
  characterContent: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // padding: 15,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
  characterName: {
    // fontSize: 18,
    // fontWeight: "700",
    // color: "#fff",
    // textShadowColor: "rgba(0, 0, 0, 0.3)",
    // textShadowOffset: { width: 0, height: 2 },
    // textShadowRadius: 6,
  },
  categoryBadge: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#f85caa",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  // Featured Services Styles

  serviceDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  // Featured Services Styles
  featuredServices: {
    padding: 20,
  },
  serviceList: {
    flexDirection: "column", // Stack buttons vertically
  },
  serviceCard: {
    marginBottom: 15, // Space between buttons
  },
  serviceButton: {
    borderRadius: 50, // Rounded corners
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 15, // Shadow for Android
  },
  serviceButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly transparent white background for the icon
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  serviceTitle: {
    flex: 1, // Take up remaining space
    fontSize: 16,
    fontWeight: "700",
    color: "#fff", // White text to contrast with the gradient background
    textAlign: "left",
  },
  viewAllButton: {
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 30, // Giữ bo góc từ trước
    overflow: "hidden", // Đảm bảo gradient không tràn ra ngoài
    shadowColor: "black",
    shadowOffset: { width: 20, height: 20 }, // Tăng offset để bóng xa hơn
    shadowOpacity: 1, // Độ tối tối đa
    shadowRadius: 50, // Bán kính bóng lớn để lan rộng
    elevation: 50, // Tăng elevation tối đa cho Android
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default HomeStyles;
