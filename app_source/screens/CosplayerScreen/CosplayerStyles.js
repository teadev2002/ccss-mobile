import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    padding: 12,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    marginHorizontal: 18,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  cosplayerCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  cosplayerContainer: {
    flexDirection: "row",
    padding: 15,
    objectFit: "cover",
  },
  cosplayerImage: {
    width: 100,
    height: 155,
    borderRadius: 10,
    marginRight: 15,
    marginVertical: 4,
  },
  cosplayerInfo: {
    flex: 1,
  },
  cosplayerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cosplayerDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  cosplayerStats: {
    flexDirection: "row",
    marginVertical: 10,
  },
  cosplayerStat: {
    marginRight: 15,
    fontSize: 14,
    color: "#333",
  },
  bookButton: {
    marginTop: 10,
    borderRadius: 5,
    overflow: "hidden",
  },

  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
