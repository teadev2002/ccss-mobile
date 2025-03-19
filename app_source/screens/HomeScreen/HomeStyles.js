// import { StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const HomeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   // Carousel Styles
//   carouselItem: {
//     width: width,
//     height: 300, // Tương đương 60vh trên mobile
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
//     fontSize: 28, // Giảm từ 3rem để phù hợp mobile
//     fontWeight: "800",
//     color: "#fff",
//     textShadowColor: "rgba(0, 0, 0, 0.5)",
//     textShadowOffset: { width: 0, height: 3 },
//     textShadowRadius: 10,
//   },
//   carouselDescription: {
//     fontSize: 16, // Giảm từ 1.3rem
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
//     fontSize: 20, // Giảm từ 2.5rem
//     fontWeight: "700",
//     color: "#510545",
//     textAlign: "center",
//     marginBottom: 20,
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
//     elevation: 0, // Cho Android
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
//     // fontSize: 18, // Giảm từ 1.4rem
//     // fontWeight: "700",
//     // color: "#fff",
//     // textShadowColor: "rgba(0, 0, 0, 0.3)",
//     // textShadowOffset: { width: 0, height: 2 },
//     // textShadowRadius: 6,
//   },
//   categoryBadge: {
//     fontSize: 14, // Giảm từ 0.9rem
//     color: "#fff",
//     backgroundColor: "#f85caa",
//     paddingVertical: 3,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginTop: 5,
//   },
//   // Featured Services Styles
//   featuredServices: {
//     padding: 20,
//   },
//   serviceList: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   serviceCard: {
//     width: (width - 60) / 2, // 2 cột, trừ padding
//     backgroundColor: "#fff",
//     borderRadius: 30,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.15,
//     shadowRadius: 25,
//     elevation: 20,
//     alignItems: "center",
//   },
//   iconWrapper: {
//     width: 60,
//     height: 60,
//     borderRadius: 35,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   serviceTitle: {
//     fontSize: 15, // Giảm từ 1.8rem
//     fontWeight: "800",
//     color: "#510545",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   serviceDescription: {
//     fontSize: 14, // Giảm từ 1.1rem
//     color: "#666",
//     textAlign: "center",
//   },
//   // View All Button
//   viewAllButton: {
//     backgroundColor: "#510545",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     alignSelf: "center",
//     marginTop: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.4,
//     shadowRadius: 20,
//     elevation: 5,
//   },
//   viewAllText: {
//     fontSize: 16, // Giảm từ 1.2rem
//     fontWeight: "700",
//     color: "#fff",
//   },
// });

// export default HomeStyles;

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Carousel Styles
  carouselItem: {
    width: width,
    height: 300,
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
    marginBottom: 20,
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
    elevation: 0,
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
  featuredServices: {
    padding: 20,
  },
  serviceList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: (width - 60) / 2,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 20,
    alignItems: "center",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#510545",
    marginBottom: 10,
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  // View All Button
  // viewAllButton: {
  //   alignSelf: "center",
  //   marginTop: 10,
  //   borderRadius: 30, // Giữ bo góc từ trước
  //   overflow: "hidden", // Đảm bảo gradient không tràn ra ngoài
  //   shadowColor: "black",
  //   shadowOffset: { width: 10, height: 12 },
  //   shadowOpacity: 1,
  //   shadowRadius: 30,
  //   elevation: 20,
  // },
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
