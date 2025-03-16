import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#510545",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#510545",
  },
  logout: {
    marginTop: "550",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#510545",
    borderRadius: 8,
    margin: 10,
    paddingVertical: 12,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
  },
});

export default styles;
