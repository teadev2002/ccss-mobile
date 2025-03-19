// import { StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#510545",
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   icon: {
//     marginRight: 15,
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#510545",
//   },
//   logout: {
//     marginTop: "420",
//     borderTopWidth: 1,
//     borderTopColor: "#ddd",
//     backgroundColor: "#510545",
//     borderRadius: 8,
//     margin: 10,
//     paddingVertical: 12,
//     display: "flex",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   logoutText: {
//     color: "#fff",
//   },
// });

// export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#510545", // Đổi màu tiêu đề thành #510545
  },
  menuItem: {
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden", // Đảm bảo gradient không tràn ra ngoài
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    color: "#510545",
  },
  gradientText: {
    fontSize: 16,
    color: "#fff", // Màu chữ trắng để nổi trên gradient
    fontWeight: "500",
  },
  logout: {
    marginTop: "400",
  },
  logoutText: {
    color: "#fff", // Không cần nữa vì đã dùng gradientText
  },
});

export default styles;
