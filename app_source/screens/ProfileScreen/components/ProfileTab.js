import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import styles from "../ProfileStyles";

const ProfileTabs = () => {
  return (
    <View style={styles.tabs}>
      <Button
        mode="text"
        style={styles.tab}
        labelStyle={[styles.tabText, styles.activeTab]}
        icon={() => <Feather name="grid" size={12} color="#080808" />}
      >
        Posts
      </Button>
    </View>
  );
};

export default ProfileTabs;
