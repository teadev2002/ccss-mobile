import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import ProfileTabs from "./components/ProfileTab";
import AppBarSimple from "../../components/appbar/SimpleAppBar";
import ProfilePostList from "./components/PostList";
import styles from "./ProfileStyles";

const Profile = () => {
  return (
    <>
    <AppBarSimple title="PROFILE" />
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ProfileHeader />
        <ProfileDetails />
        <ProfileTabs />
        <ProfilePostList />
      </ScrollView>
    </View>
    </>
  );
};

export default Profile;
