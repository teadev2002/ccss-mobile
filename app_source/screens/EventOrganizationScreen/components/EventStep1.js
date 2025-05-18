import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DetailEventOrganizationPageService from "../../../apiServices/eventOrganizeService/DetailEventOrganizationPageService";
import styles from "../css/Step1Style";

const EventStep1 = ({ goNextStep }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  const placeholderImages = [
    "https://cdn.prod.website-files.com/6769617aecf082b10bb149ff/67763d8a2775bee07438e7a5_Events.png",
    "https://jjrmarketing.com/wp-content/uploads/2019/12/International-Event.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn=9GcSnEys5tBHYLbhADjGJzoM5BloFy9AP-uyRzg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn=9GcQ3DNasCvfOLMIxJyQtbNq7EfLkWnMazHE9xw&s",
    "https://scandiweb.com/blog/wp-content/uploads/2020/01/ecom360_conference_hosting_successful_event.jpeg",
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoadingPackages(true);
        const data = await DetailEventOrganizationPageService.getAllPackages();
        const packagesWithImages = data.map((pkg, index) => ({
          ...pkg,
          image: placeholderImages[index % placeholderImages.length],
        }));
        setPackages(packagesWithImages);
      } catch (error) {
        console.error("Failed to fetch packages", error);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Event Package</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search packages..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {loadingPackages ? (
        <ActivityIndicator size="large" color="#510545" />
      ) : (
        filteredPackages.map((pkg) => (
          <TouchableOpacity
            key={pkg.packageId}
            style={[
              styles.card,
              selectedPackage?.packageId === pkg.packageId && styles.selectedCard,
            ]}
            onPress={() => setSelectedPackage(pkg)}
          >
            <Image source={{ uri: pkg.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{pkg.packageName}</Text>
              <Text>{pkg.description}</Text>
              <Text style={styles.price}>Price: {pkg.price.toLocaleString()} VND</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      {selectedPackage && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => goNextStep(selectedPackage)}
        >
          <LinearGradient
            colors={["#510545", "#22668a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.submitButtonText}>Next Step</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default EventStep1;
