import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../css/Step1Style"; 

const EventStep1 = ({ goNextStep }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      name: "Small Package",
      description: "For up to 3 cosplayers",
      details:
        "Suitable for small events like birthdays or family gatherings. Includes basic support, standard costumes, and 1-hour performance.",
      image:
        "https://cdn.prod.website-files.com/6769617aecf082b10bb149ff/67763d8a2775bee07438e7a5_Events.png",
      maxAttendees: 50,
      benefits: ["Basic support", "Standard costumes", "1-hour performance"],
    },
    {
      name: "Medium Package",
      description: "For up to 5 cosplayers",
      details:
        "Perfect for medium-sized events. Includes themed decorations, enhanced support, premium costumes, and 2-hour performance.",
      image:
        "https://jjrmarketing.com/wp-content/uploads/2019/12/International-Event.jpg",
      maxAttendees: 100,
      benefits: [
        "Themed decorations",
        "Enhanced support",
        "Premium costumes",
        "2-hour performance",
      ],
    },
    {
      name: "Large Package",
      description: "For up to 10 cosplayers",
      details:
        "Ideal for conferences or large events. Includes full setup, premium features, custom costumes, and 3-hour performance.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEys5tBHYLbhADjGJzoM5BloFy9AP-uyRzg&s",
      maxAttendees: 200,
      benefits: [
        "Full setup",
        "Premium features",
        "Custom costumes",
        "3-hour performance",
      ],
    },
    {
      name: "VIP Package",
      description: "For up to 15 cosplayers",
      details:
        "Ultimate experience with exclusive access, VIP support, luxury costumes, and 4-hour performance.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3DNasCvfOLMIxJyQtbNq7EfLkWnMazHE9xw&s",
      maxAttendees: 300,
      benefits: [
        "Exclusive access",
        "VIP support",
        "Luxury costumes",
        "4-hour performance",
      ],
    },
    {
      name: "Custom Package",
      description: "Tailored to your needs",
      details:
        "Create a custom package with flexible options. Contact us for details.",
      image:
        "https://scandiweb.com/blog/wp-content/uploads/2020/01/ecom360_conference_hosting_successful_event.jpeg",
      maxAttendees: "Unlimited",
      benefits: [
        "Flexible options",
        "Personalized support",
        "Custom performance",
      ],
    },
  ];
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Event Package</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for event packages..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {filteredPackages.map((pkg) => (
        <TouchableOpacity
          key={pkg.name}
          style={[
            styles.card,
            selectedPackage?.name === pkg.name && styles.selectedCard,
          ]}
          onPress={() => setSelectedPackage(pkg)}
        >
          <Image source={{ uri: pkg.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{pkg.name}</Text>
            <Text>{pkg.description}</Text>
            <Text style={styles.bold}>Max Attendees: {pkg.maxAttendees}</Text>
            <Text style={styles.bold}>Benefits:</Text>
            {pkg.benefits.map((b, i) => (
              <Text key={i}>• {b}</Text>
            ))}
          </View>
        </TouchableOpacity>
      ))}

      {/* Sticky nút Next */}
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
