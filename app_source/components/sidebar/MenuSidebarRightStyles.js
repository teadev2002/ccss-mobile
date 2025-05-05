import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#510545",
  },
  useremail: {
    fontSize: 13,
    color: "#777",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  menuWrapper: {
    flex: 1,
    marginTop: 20,
  },
  menuItem: {
    marginVertical: 8,
    borderRadius: 14,
    overflow: "hidden",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  gradientText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  // 👉 Submenu thêm mới
  submenuContainer: {
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 20, // Lùi vào bên phải
  },
  
  submenuButton: {
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  
  submenuGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  
  submenuIcon: {
    marginRight: 8,
  },
  
  submenuText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  
});

export default styles;
