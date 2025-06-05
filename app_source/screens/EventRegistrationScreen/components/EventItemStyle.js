import { StyleSheet } from "react-native";

export default StyleSheet.create({
  eventContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  dateContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 6,
    borderRadius: 6,
  },
  dateMonth: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  eventDetails: {
    padding: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusTagContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  statusTag: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  moreButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    padding: 8,
  },
  expiredTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#dc3545",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  expiredText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});