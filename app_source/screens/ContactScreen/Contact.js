import React from "react";
import { View, ScrollView, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button, Text } from "react-native-paper"; // Loại bỏ TextInput tạm thời để kiểm tra
import styles from "./ContactStyles";

const Contact = () => {
  const navigation = useNavigation();

  const openGoogleMaps = () => {
    const url =
      "https://www.google.com/maps/place/District+1,+Ho+Chi+Minh+City,+Vietnam/@10.775892989376153,106.69886867465353,15z";
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          style={styles.backButton}
          icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>CONTACT</Text>
      </View>

      {/* Hero Section */}
      <LinearGradient
        colors={["#510545", "#22668a", "#1a1a2e"]}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>
          Cosplay Companion {"\n"}Service System
        </Text>
        <Text style={styles.heroSubtitle}>
          Need support? Don't hesitate to send our team a message!
        </Text>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.row}>
          {/* Contact Details */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>Contact Information</Title>

              <View style={styles.infoItem}>
                <Feather name="map-pin" size={24} color="#510545" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoText}>
                    123 Cosplay Street{"\n"}District 1{"\n"}Ho Chi Minh City
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Feather name="phone" size={24} color="#510545" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoText}>+84 123 456 789</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Feather name="mail" size={24} color="#510545" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoText}>anhhoanggg855@gmail.com</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Feather name="clock" size={24} color="#510545" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Opening Hours</Text>
                  <Text style={styles.infoText}>
                    Monday - Saturday: 8:00 AM - 8:00 PM{"\n"}
                    Sunday: Closed
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Location Section */}
          <Card style={styles.mapCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>Location</Title>
              <Button
                mode="contained"
                style={styles.mapButton}
                icon={() => <Feather name="map" size={20} color="#fff" />}
                onPress={openGoogleMaps}
              >
                View on Google Maps
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default Contact;
