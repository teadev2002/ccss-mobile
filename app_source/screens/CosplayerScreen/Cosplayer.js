import { View, Text } from "react-native";
import React from "react";

const Cosplayer = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cosplayer Screen</Text>
    </View>
  );
};

export default Cosplayer;

// import {
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// const Cosplayer = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Header với hình nền */}
//       <ImageBackground
//         source={{
//           uri: "https://th.bing.com/th/id/R.32ada2b20a764c07f62d8405b21c1ae7?rik=QbEtGn4nfD654Q&pid=ImgRaw&r=0",
//         }}
//         style={styles.headerBackground}
//       >
//         {/* Lớp phủ mờ */}
//         <View style={styles.overlay} />

//         {/* Nội dung header */}
//         <View style={styles.headerContent}>
//           {/* Nút quay lại */}
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Home")} // Điều hướng về trang Home
//             style={styles.backButton}
//           >
//             <Ionicons name="arrow-back" size={30} color="#fff" />
//           </TouchableOpacity>

//           {/* Tiêu đề */}
//           <Text style={styles.headerTitle}>Cosplayer</Text>
//         </View>
//       </ImageBackground>

//       {/* Nội dung chính */}
//       <View style={styles.content}>
//         <Text style={styles.contentText}>Cosplayer Screen</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   headerBackground: {
//     width: "100%",
//     height: 200, // Chiều cao header
//     justifyContent: "center",
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject, // Lớp phủ toàn bộ header
//     backgroundColor: "rgba(0, 0, 0, 0.4)", // Màu đen mờ với độ trong suốt
//   },
//   headerContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 40, // Đẩy nội dung xuống để tránh che khuất status bar
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentText: {
//     fontSize: 18,
//     color: "#333",
//   },
// });

// export default Cosplayer;
