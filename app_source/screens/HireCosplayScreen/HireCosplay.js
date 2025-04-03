// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import moment from "moment";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { jwtDecode } from "jwt-decode"; // Thư viện để decode JWT
// import styles from "./HireCosplayStyles";

// const HireCosplay = () => {
//   const navigation = useNavigation();

//   // State để lưu trữ dữ liệu form
//   const [formData, setFormData] = useState({
//     accountId: "", // Khởi tạo rỗng, sẽ được cập nhật sau khi decode
//     name: "Hire Cosplayer Request",
//     description: "",
//     price: 0,
//     startDate: "",
//     endDate: "",
//     startTime: "",
//     endTime: "",
//     location: "",
//     serviceId: "",
//     packageId: null,
//     accountCouponId: "",
//     listRequestCharacters: [],
//   });

//   // State để lưu trữ lỗi validation
//   const [errors, setErrors] = useState({});

//   // Lấy accessToken và decode để lấy accountId
//   useEffect(() => {
//     const fetchAccountId = async () => {
//       try {
//         const accessToken = await AsyncStorage.getItem("accessToken"); // Lấy token từ AsyncStorage
//         if (accessToken) {
//           const decodedToken = jwtDecode(accessToken); // Decode token
//           const Id = decodedToken.Id || decodedToken.sub || decodedToken.Id; // Tùy thuộc cấu trúc token
//           if (Id) {
//             setFormData((prevData) => ({
//               ...prevData,
//               accountId: Id, // Cập nhật accountId vào formData
//             }));
//           } else {
//             console.log("Không tìm thấy accountId trong token");
//           }
//         } else {
//           console.log("Không tìm thấy accessToken");
//         }
//       } catch (error) {
//         console.log("Lỗi khi decode token:", error);
//       }
//     };

//     fetchAccountId();
//   }, []); // Chạy một lần khi component mount

//   // Xử lý quay lại
//   const handleGoBack = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     } else {
//       console.log("Không thể quay lại màn hình trước.");
//     }
//   };

//   // Hàm lọc chỉ cho phép số và dấu / hoặc :
//   const filterDateInput = (text) => {
//     return text.replace(/[^0-9/]/g, ""); // Chỉ cho phép số và dấu /
//   };

//   const filterTimeInput = (text) => {
//     return text.replace(/[^0-9:]/g, ""); // Chỉ cho phép số và dấu :
//   };

//   // Hàm kiểm tra validation
//   const validateForm = () => {
//     const newErrors = {};
//     const now = moment();

//     // Kiểm tra các trường bắt buộc
//     if (!formData.startDate) newErrors.startDate = "Start date is required";
//     if (!formData.endDate) newErrors.endDate = "End date is required";
//     if (!formData.startTime) newErrors.startTime = "Start time is required";
//     if (!formData.endTime) newErrors.endTime = "End time is required";
//     if (!formData.location) newErrors.location = "Location is required";

//     // Kiểm tra định dạng và logic ngày giờ
//     const isStartDateValid = moment(
//       formData.startDate,
//       "DD/MM/YYYY",
//       true
//     ).isValid();
//     const isEndDateValid = moment(
//       formData.endDate,
//       "DD/MM/YYYY",
//       true
//     ).isValid();
//     const isStartTimeValid = moment(
//       formData.startTime,
//       "HH:mm",
//       true
//     ).isValid();
//     const isEndTimeValid = moment(formData.endTime, "HH:mm", true).isValid();

//     if (!isStartDateValid && formData.startDate) {
//       newErrors.startDate = "Invalid format. Use DD/MM/YYYY";
//     }
//     if (!isEndDateValid && formData.endDate) {
//       newErrors.endDate = "Invalid format. Use DD/MM/YYYY";
//     }
//     if (!isStartTimeValid && formData.startTime) {
//       newErrors.startTime = "Invalid format. Use HH:mm";
//     }
//     if (!isEndTimeValid && formData.endTime) {
//       newErrors.endTime = "Invalid format. Use HH:mm";
//     }

//     // Kiểm tra ngày giờ không ở quá khứ và ngày kết thúc >= ngày bắt đầu
//     if (isStartDateValid && isStartTimeValid) {
//       const startMoment = moment(
//         `${formData.startDate} ${formData.startTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       if (startMoment.isBefore(now)) {
//         newErrors.startDate = "Start date and time cannot be in the past";
//       }
//     }

//     if (isEndDateValid && isEndTimeValid) {
//       const endMoment = moment(
//         `${formData.endDate} ${formData.endTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       if (endMoment.isBefore(now)) {
//         newErrors.endDate = "End date and time cannot be in the past";
//       }
//     }

//     if (
//       isStartDateValid &&
//       isEndDateValid &&
//       isStartTimeValid &&
//       isEndTimeValid
//     ) {
//       const startMoment = moment(
//         `${formData.startDate} ${formData.startTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       const endMoment = moment(
//         `${formData.endDate} ${formData.endTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       if (endMoment.isBefore(startMoment)) {
//         newErrors.endDate =
//           "End date must be greater than or equal to start date";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Xử lý nhấn nút "Next Step"
//   const handleNextStep = () => {
//     if (!validateForm()) {
//       console.log("Validation failed:", errors);
//       return;
//     }

//     const formattedData = {
//       ...formData,
//       startDate: `${formData.startTime} ${formData.startDate}`,
//       endDate: `${formData.endTime} ${formData.endDate}`,
//     };
//     console.log("Final JSON Object:", JSON.stringify(formattedData, null, 2));

//     // Điều hướng sang ChooseCharacter screen với dữ liệu form
//     navigation.navigate("ChooseCharacter", { formData: formattedData });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Hire Cosplayer</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <ScrollView style={styles.content}>
//         <Text style={styles.sectionTitle}>Book Your Cosplayer</Text>

//         {/* Ngày bắt đầu và ngày kết thúc trên cùng một hàng */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Date</Text>
//           <View style={styles.row}>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="Start (DD/MM/YYYY)"
//                 value={formData.startDate}
//                 onChangeText={(value) =>
//                   setFormData({
//                     ...formData,
//                     startDate: filterDateInput(value),
//                   })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.startDate && (
//                 <Text style={styles.errorText}>{errors.startDate}</Text>
//               )}
//             </View>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="End (DD/MM/YYYY)"
//                 value={formData.endDate}
//                 onChangeText={(value) =>
//                   setFormData({ ...formData, endDate: filterDateInput(value) })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.endDate && (
//                 <Text style={styles.errorText}>{errors.endDate}</Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Giờ bắt đầu và giờ kết thúc trên cùng một hàng */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Time</Text>
//           <View style={styles.row}>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="Start (HH:mm)"
//                 value={formData.startTime}
//                 onChangeText={(value) =>
//                   setFormData({
//                     ...formData,
//                     startTime: filterTimeInput(value),
//                   })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.startTime && (
//                 <Text style={styles.errorText}>{errors.startTime}</Text>
//               )}
//             </View>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="End (HH:mm)"
//                 value={formData.endTime}
//                 onChangeText={(value) =>
//                   setFormData({ ...formData, endTime: filterTimeInput(value) })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.endTime && (
//                 <Text style={styles.errorText}>{errors.endTime}</Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Địa điểm */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Location</Text>
//           <TextInput
//             placeholder="Enter location"
//             value={formData.location}
//             onChangeText={(value) =>
//               setFormData({ ...formData, location: value })
//             }
//             style={styles.input}
//           />
//           {errors.location && (
//             <Text style={styles.errorText}>{errors.location}</Text>
//           )}
//         </View>

//         {/* Coupon */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Coupon Code (Optional)</Text>
//           <TextInput
//             placeholder="Enter coupon code"
//             value={formData.accountCouponId}
//             onChangeText={(value) =>
//               setFormData({ ...formData, accountCouponId: value })
//             }
//             style={styles.input}
//           />
//         </View>

//         {/* Nút Next Step */}
//         <TouchableOpacity style={styles.submitButton} onPress={handleNextStep}>
//           <LinearGradient
//             colors={["#510545", "#22668a"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.gradientButton}
//           >
//             <Text style={styles.submitButtonText}>Next Step</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HireCosplay;
///////////////////////////=======================oke==========
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import moment from "moment";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { jwtDecode } from "jwt-decode"; // Thư viện để decode JWT
// import styles from "./HireCosplayStyles";

// const HireCosplay = () => {
//   const navigation = useNavigation();

//   // State để lưu trữ dữ liệu form
//   const [formData, setFormData] = useState({
//     accountId: "", // Khởi tạo rỗng, sẽ được cập nhật sau khi decode
//     name: "Hire Cosplayer Request",
//     description: "",
//     price: 0,
//     startDate: "",
//     endDate: "",
//     startTime: "",
//     endTime: "",
//     location: "",
//     serviceId: "",
//     packageId: null,
//     accountCouponId: "",
//     listRequestCharacters: [],
//   });

//   // State để lưu trữ lỗi validation
//   const [errors, setErrors] = useState({});

//   // Lấy accessToken và decode để lấy accountId
//   useEffect(() => {
//     const fetchAccountId = async () => {
//       try {
//         const accessToken = await AsyncStorage.getItem("accessToken"); // Lấy token từ AsyncStorage
//         if (accessToken) {
//           const decodedToken = jwtDecode(accessToken); // Decode token
//           const accountId =
//             decodedToken.Id || decodedToken.sub || decodedToken.userId; // Sửa lỗi trùng lặp
//           if (accountId) {
//             setFormData((prevData) => ({
//               ...prevData,
//               accountId: accountId, // Cập nhật accountId vào formData
//             }));
//           } else {
//             console.log("Không tìm thấy accountId trong token");
//           }
//         } else {
//           console.log("Không tìm thấy accessToken");
//         }
//       } catch (error) {
//         console.log("Lỗi khi decode token:", error);
//       }
//     };

//     fetchAccountId();
//   }, []); // Chạy một lần khi component mount

//   // Xử lý quay lại
//   const handleGoBack = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     } else {
//       console.log("Không thể quay lại màn hình trước.");
//     }
//   };

//   // Hàm lọc chỉ cho phép số và dấu / hoặc :
//   const filterDateInput = (text) => {
//     return text.replace(/[^0-9/]/g, ""); // Chỉ cho phép số và dấu /
//   };

//   const filterTimeInput = (text) => {
//     return text.replace(/[^0-9:]/g, ""); // Chỉ cho phép số và dấu :
//   };

//   // Hàm kiểm tra validation
//   const validateForm = () => {
//     const newErrors = {};
//     const now = moment();

//     // Kiểm tra các trường bắt buộc
//     if (!formData.startDate) newErrors.startDate = "Start date is required";
//     if (!formData.endDate) newErrors.endDate = "End date is required";
//     if (!formData.startTime) newErrors.startTime = "Start time is required";
//     if (!formData.endTime) newErrors.endTime = "End time is required";
//     if (!formData.location) newErrors.location = "Location is required";

//     // Kiểm tra định dạng và logic ngày giờ
//     const isStartDateValid = moment(
//       formData.startDate,
//       "DD/MM/YYYY",
//       true
//     ).isValid();
//     const isEndDateValid = moment(
//       formData.endDate,
//       "DD/MM/YYYY",
//       true
//     ).isValid();
//     const isStartTimeValid = moment(
//       formData.startTime,
//       "HH:mm",
//       true
//     ).isValid();
//     const isEndTimeValid = moment(formData.endTime, "HH:mm", true).isValid();

//     if (!isStartDateValid && formData.startDate) {
//       newErrors.startDate = "Invalid format. Use DD/MM/YYYY";
//     }
//     if (!isEndDateValid && formData.endDate) {
//       newErrors.endDate = "Invalid format. Use DD/MM/YYYY";
//     }
//     if (!isStartTimeValid && formData.startTime) {
//       newErrors.startTime = "Invalid format. Use HH:mm";
//     }
//     if (!isEndTimeValid && formData.endTime) {
//       newErrors.endTime = "Invalid format. Use HH:mm";
//     }

//     // Kiểm tra ngày giờ không ở quá khứ và ngày kết thúc >= ngày bắt đầu
//     if (isStartDateValid && isStartTimeValid) {
//       const startMoment = moment(
//         `${formData.startDate} ${formData.startTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       if (startMoment.isBefore(now)) {
//         newErrors.startDate = "Start date and time cannot be in the past";
//       }
//     }

//     if (isEndDateValid && isEndTimeValid) {
//       const endMoment = moment(
//         `${formData.endDate} ${formData.endTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       if (endMoment.isBefore(now)) {
//         newErrors.endDate = "End date and time cannot be in the past";
//       }
//     }

//     if (
//       isStartDateValid &&
//       isEndDateValid &&
//       isStartTimeValid &&
//       isEndTimeValid
//     ) {
//       const startMoment = moment(
//         `${formData.startDate} ${formData.startTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       const endMoment = moment(
//         `${formData.endDate} ${formData.endTime}`,
//         "DD/MM/YYYY HH:mm"
//       );
//       if (endMoment.isBefore(startMoment)) {
//         newErrors.endDate =
//           "End date must be greater than or equal to start date";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Xử lý nhấn nút "Next Step"
//   const handleNextStep = async () => {
//     if (!validateForm()) {
//       console.log("Validation failed:", errors);
//       return;
//     }

//     const formattedData = {
//       ...formData,
//       startDate: `${formData.startTime} ${formData.startDate}`,
//       endDate: `${formData.endTime} ${formData.endDate}`,
//     };
//     const formattedDataString = JSON.stringify(formattedData, null, 2);
//     console.log("Final JSON Object:", formattedDataString);

//     // Lưu formattedData vào AsyncStorage
//     try {
//       await AsyncStorage.setItem("hireCosplayData", formattedDataString);
//       console.log("Dữ liệu đã được lưu vào AsyncStorage");
//     } catch (error) {
//       console.log("Lỗi khi lưu dữ liệu vào AsyncStorage:", error);
//     }

//     // Điều hướng sang ChooseCharacter screen với dữ liệu form
//     navigation.navigate("ChooseCharacter", { formData: formattedData });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Hire Cosplayer</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <ScrollView style={styles.content}>
//         <Text style={styles.sectionTitle}>Book Your Cosplayer</Text>

//         {/* Ngày bắt đầu và ngày kết thúc trên cùng một hàng */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Date</Text>
//           <View style={styles.row}>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="Start (DD/MM/YYYY)"
//                 value={formData.startDate}
//                 onChangeText={(value) =>
//                   setFormData({
//                     ...formData,
//                     startDate: filterDateInput(value),
//                   })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.startDate && (
//                 <Text style={styles.errorText}>{errors.startDate}</Text>
//               )}
//             </View>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="End (DD/MM/YYYY)"
//                 value={formData.endDate}
//                 onChangeText={(value) =>
//                   setFormData({ ...formData, endDate: filterDateInput(value) })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.endDate && (
//                 <Text style={styles.errorText}>{errors.endDate}</Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Giờ bắt đầu và giờ kết thúc trên cùng một hàng */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Time</Text>
//           <View style={styles.row}>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="Start (HH:mm)"
//                 value={formData.startTime}
//                 onChangeText={(value) =>
//                   setFormData({
//                     ...formData,
//                     startTime: filterTimeInput(value),
//                   })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.startTime && (
//                 <Text style={styles.errorText}>{errors.startTime}</Text>
//               )}
//             </View>
//             <View style={styles.halfInputContainer}>
//               <TextInput
//                 placeholder="End (HH:mm)"
//                 value={formData.endTime}
//                 onChangeText={(value) =>
//                   setFormData({ ...formData, endTime: filterTimeInput(value) })
//                 }
//                 style={[styles.input, styles.halfInput]}
//                 keyboardType="default"
//               />
//               {errors.endTime && (
//                 <Text style={styles.errorText}>{errors.endTime}</Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Địa điểm */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Location</Text>
//           <TextInput
//             placeholder="Enter location"
//             value={formData.location}
//             onChangeText={(value) =>
//               setFormData({ ...formData, location: value })
//             }
//             style={styles.input}
//           />
//           {errors.location && (
//             <Text style={styles.errorText}>{errors.location}</Text>
//           )}
//         </View>

//         {/* Coupon */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Coupon Code (Optional)</Text>
//           <TextInput
//             placeholder="Enter coupon code"
//             value={formData.accountCouponId}
//             onChangeText={(value) =>
//               setFormData({ ...formData, accountCouponId: value })
//             }
//             style={styles.input}
//           />
//         </View>

//         {/* Nút Next Step */}
//         <TouchableOpacity style={styles.submitButton} onPress={handleNextStep}>
//           <LinearGradient
//             colors={["#510545", "#22668a"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.gradientButton}
//           >
//             <Text style={styles.submitButtonText}>Next Step</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HireCosplay;

//=================thêm nút nhập nhanh
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // Thư viện để decode JWT
import styles from "./HireCosplayStyles";

const HireCosplay = () => {
  const navigation = useNavigation();

  // State để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    accountId: "", // Khởi tạo rỗng, sẽ được cập nhật sau khi decode
    name: "Hire Cosplayer Request",
    description: "",
    price: 0,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    serviceId: "",
    packageId: null,
    accountCouponId: "",
    listRequestCharacters: [],
  });

  // State để lưu trữ lỗi validation
  const [errors, setErrors] = useState({});

  // Lấy accessToken và decode để lấy accountId
  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken"); // Lấy token từ AsyncStorage
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken); // Decode token
          const accountId =
            decodedToken.Id || decodedToken.sub || decodedToken.userId; // Sửa lỗi trùng lặp
          if (accountId) {
            setFormData((prevData) => ({
              ...prevData,
              accountId: accountId, // Cập nhật accountId vào formData
            }));
          } else {
            console.log("Không tìm thấy accountId trong token");
          }
        } else {
          console.log("Không tìm thấy accessToken");
        }
      } catch (error) {
        console.log("Lỗi khi decode token:", error);
      }
    };

    fetchAccountId();
  }, []); // Chạy một lần khi component mount

  // Xử lý quay lại
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Không thể quay lại màn hình trước.");
    }
  };

  // Hàm lọc chỉ cho phép số và dấu / hoặc :
  const filterDateInput = (text) => {
    return text.replace(/[^0-9/]/g, ""); // Chỉ cho phép số và dấu /
  };

  const filterTimeInput = (text) => {
    return text.replace(/[^0-9:]/g, ""); // Chỉ cho phép số và dấu :
  };

  // Hàm kiểm tra validation
  const validateForm = () => {
    const newErrors = {};
    const now = moment();

    // Kiểm tra các trường bắt buộc
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.location) newErrors.location = "Location is required";

    // Kiểm tra định dạng và logic ngày giờ
    const isStartDateValid = moment(
      formData.startDate,
      "DD/MM/YYYY",
      true
    ).isValid();
    const isEndDateValid = moment(
      formData.endDate,
      "DD/MM/YYYY",
      true
    ).isValid();
    const isStartTimeValid = moment(
      formData.startTime,
      "HH:mm",
      true
    ).isValid();
    const isEndTimeValid = moment(formData.endTime, "HH:mm", true).isValid();

    if (!isStartDateValid && formData.startDate) {
      newErrors.startDate = "Invalid format. Use DD/MM/YYYY";
    }
    if (!isEndDateValid && formData.endDate) {
      newErrors.endDate = "Invalid format. Use DD/MM/YYYY";
    }
    if (!isStartTimeValid && formData.startTime) {
      newErrors.startTime = "Invalid format. Use HH:mm";
    }
    if (!isEndTimeValid && formData.endTime) {
      newErrors.endTime = "Invalid format. Use HH:mm";
    }

    // Kiểm tra ngày giờ không ở quá khứ và ngày kết thúc >= ngày bắt đầu
    if (isStartDateValid && isStartTimeValid) {
      const startMoment = moment(
        `${formData.startDate} ${formData.startTime}`,
        "DD/MM/YYYY HH:mm"
      );
      if (startMoment.isBefore(now)) {
        newErrors.startDate = "Start date and time cannot be in the past";
      }
    }

    if (isEndDateValid && isEndTimeValid) {
      const endMoment = moment(
        `${formData.endDate} ${formData.endTime}`,
        "DD/MM/YYYY HH:mm"
      );
      if (endMoment.isBefore(now)) {
        newErrors.endDate = "End date and time cannot be in the past";
      }
    }

    if (
      isStartDateValid &&
      isEndDateValid &&
      isStartTimeValid &&
      isEndTimeValid
    ) {
      const startMoment = moment(
        `${formData.startDate} ${formData.startTime}`,
        "DD/MM/YYYY HH:mm"
      );
      const endMoment = moment(
        `${formData.endDate} ${formData.endTime}`,
        "DD/MM/YYYY HH:mm"
      );
      if (endMoment.isBefore(startMoment)) {
        newErrors.endDate =
          "End date must be greater than or equal to start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý nhấn nút "Next Step"
  const handleNextStep = async () => {
    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    const formattedData = {
      ...formData,
      startDate: `${formData.startTime} ${formData.startDate}`,
      endDate: `${formData.endTime} ${formData.endDate}`,
    };
    const formattedDataString = JSON.stringify(formattedData, null, 2);
    console.log("Final JSON Object:", formattedDataString);

    // Lưu formattedData vào AsyncStorage
    try {
      await AsyncStorage.setItem("hireCosplayData", formattedDataString);
      console.log("Dữ liệu đã được lưu vào AsyncStorage");
    } catch (error) {
      console.log("Lỗi khi lưu dữ liệu vào AsyncStorage:", error);
    }

    // Điều hướng sang ChooseCharacter screen với dữ liệu form
    navigation.navigate("ChooseCharacter", { formData: formattedData });
  };

  // Hàm điền nhanh dữ liệu mẫu (tạm thời)
  const handleFillSampleData = () => {
    const sampleData = {
      ...formData,
      startDate: "05/04/2025",
      endDate: "05/04/2025",
      startTime: "10:00",
      endTime: "15:00",
      location: "Hanoi, Vietnam",
      accountCouponId: "SAMPLE123",
    };
    setFormData(sampleData);
    setErrors({}); // Xóa lỗi validation khi điền mẫu
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hire Cosplayer</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Book Your Cosplayer</Text>

        {/* Ngày bắt đầu và ngày kết thúc trên cùng một hàng */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <TextInput
                placeholder="Start (DD/MM/YYYY)"
                value={formData.startDate}
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    startDate: filterDateInput(value),
                  })
                }
                style={[styles.input, styles.halfInput]}
                keyboardType="default"
              />
              {errors.startDate && (
                <Text style={styles.errorText}>{errors.startDate}</Text>
              )}
            </View>
            <View style={styles.halfInputContainer}>
              <TextInput
                placeholder="End (DD/MM/YYYY)"
                value={formData.endDate}
                onChangeText={(value) =>
                  setFormData({ ...formData, endDate: filterDateInput(value) })
                }
                style={[styles.input, styles.halfInput]}
                keyboardType="default"
              />
              {errors.endDate && (
                <Text style={styles.errorText}>{errors.endDate}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Giờ bắt đầu và giờ kết thúc trên cùng một hàng */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <TextInput
                placeholder="Start (HH:mm)"
                value={formData.startTime}
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    startTime: filterTimeInput(value),
                  })
                }
                style={[styles.input, styles.halfInput]}
                keyboardType="default"
              />
              {errors.startTime && (
                <Text style={styles.errorText}>{errors.startTime}</Text>
              )}
            </View>
            <View style={styles.halfInputContainer}>
              <TextInput
                placeholder="End (HH:mm)"
                value={formData.endTime}
                onChangeText={(value) =>
                  setFormData({ ...formData, endTime: filterTimeInput(value) })
                }
                style={[styles.input, styles.halfInput]}
                keyboardType="default"
              />
              {errors.endTime && (
                <Text style={styles.errorText}>{errors.endTime}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Địa điểm */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            placeholder="Enter location"
            value={formData.location}
            onChangeText={(value) =>
              setFormData({ ...formData, location: value })
            }
            style={styles.input}
          />
          {errors.location && (
            <Text style={styles.errorText}>{errors.location}</Text>
          )}
        </View>

        {/* Coupon */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Coupon Code (Optional)</Text>
          <TextInput
            placeholder="Enter coupon code"
            value={formData.accountCouponId}
            onChangeText={(value) =>
              setFormData({ ...formData, accountCouponId: value })
            }
            style={styles.input}
          />
        </View>

        {/* Nút Next Step */}
        <TouchableOpacity style={styles.submitButton} onPress={handleNextStep}>
          <LinearGradient
            colors={["#510545", "#22668a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.submitButtonText}>Next Step</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Nút Fill Sample Data (tạm thời) */}
        <TouchableOpacity
          style={styles.sampleButton}
          onPress={handleFillSampleData}
        >
          <Text style={styles.sampleButtonText}>Fill Sample Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HireCosplay;
