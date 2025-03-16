import React from "react";
import { View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./NotiStyles.js";
import moment from "moment"; // Thêm moment để định dạng thời gian

const notifications = [
  {
    Id: "1",
    AccountId: "101", // ID của tài khoản gửi thông báo
    Message:
      "sarkar15 commented on the question you have answered the three consecutive int,...",
    IsRead: false, // Chưa đọc
    CreatedAt: "2025-03-16T09:40:00Z", // Thời gian tạo (ISO format)
  },
  {
    Id: "2",
    AccountId: "102",
    Message: "evanewoodd said thanks for the answer",
    IsRead: true, // Đã đọc
    CreatedAt: "2025-03-16T09:29:00Z",
  },
  {
    Id: "3",
    AccountId: "101",
    Message:
      "sarkar15 answered a question you are following the sum of the three consecutive int,...",
    IsRead: false,
    CreatedAt: "2025-03-16T09:25:00Z",
  },
  {
    Id: "4",
    AccountId: "101",
    Message:
      "sarkar15 Saturday afternoon, your question On the three consecutive int,... Armand sent m...",
    IsRead: true,
    CreatedAt: "2025-03-16T09:08:00Z",
  },
  {
    Id: "5",
    AccountId: "101",
    Message:
      "sarkar15 commented on the question you have answered the sum of the three consecutive int,...",
    IsRead: false,
    CreatedAt: "2025-03-16T09:40:00Z",
  },
];

const Noti = () => {
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.notificationItem,
        !item.IsRead && styles.unreadNotification, // Áp dụng style đặc biệt nếu chưa đọc
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.actionText}>{item.Message}</Text>
        <Text style={styles.timeText}>
          {moment(item.CreatedAt).fromNow()} {/* Định dạng thời gian */}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons
          style={styles.icon}
          name="notifications-outline"
          size={22}
          color="#000"
          marginTop={-10}
        />{" "}
        NOTIFICATIONS
      </Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Noti;
