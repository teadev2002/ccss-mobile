import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const horizontalPadding = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
    color: "#1e293b",
    textAlign: "center",
    paddingHorizontal: horizontalPadding,
  },
  searchInput: {
    height: 48,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginHorizontal: horizontalPadding,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    width: width - horizontalPadding * 2,
    marginHorizontal: horizontalPadding,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedCard: {
    borderColor: "#3b82f6",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "600",
    marginTop: 10,
    color: "#334155",
  },
  price: {
  marginTop: 4,
  fontWeight: "bold",
  color: "#22668a",
},
  submitButton: {
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#510545",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fixedNextButton: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  zIndex: 1000,
},

gradientButton: {
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

submitButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

});

export default styles;
