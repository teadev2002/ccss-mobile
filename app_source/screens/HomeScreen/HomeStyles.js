import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF1A",
  },
  // Welcome Section Styles
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 50,
    elevation: 10,
  },
  welcomeAvatar: {
    marginLeft: 80,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontFamily: "Poppins-SemiBoldItalic",
    fontSize: 30,
    color: "#666",
  },
  welcomeName: {
    fontFamily: "Poppins-SemiBoldItalic",
    fontSize: 14,
    color: "#000",
  },
  // Carousel Styles
  carousel: {
    borderRadius: 12,
  },
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
    paddingHorizontal: 20,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  
  seeMore: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#22668a",
  },
  sectionTitle: {
    fontSize: 25,
    color: "#510545",
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
  categoryBadge: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#f85caa",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
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
    borderRadius: 30, 
    overflow: "hidden", 
    shadowColor: "black",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1, 
    shadowRadius: 50, 
    elevation: 50, 
  },
  gradientButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 10,
    color: "#fff",
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 25,
    marginBottom: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: { fontSize: 30, marginBottom: 5 },
  title: { fontSize: 16, fontWeight: '500', color: "#fff" },
  filterRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  
  filterText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Poppins-Regular",
  },
  
  activeFilterTextShadow: {
    color: "#510545",
    fontFamily: "Poppins-Bold",
    textShadowColor: "rgba(81, 5, 69, 0.4)", 
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },  
});

export default HomeStyles;
