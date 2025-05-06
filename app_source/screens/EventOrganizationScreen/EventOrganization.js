import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./EventOrganizationStyles";
import EventStep1 from "./components/EventStep1"; 
import EventStep2 from "./components/EventStep2"; 
import EventStep3 from "./components/EventStep3"; 
import EventStep4 from "./components/EventStep4"; 

const EventOrganization = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const [eventData, setEventData] = useState({
    selectedPackage: null,
    eventName: '',
    eventTheme: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
    venueDescription: '',
    images: [],
    useCosplayerList: true,
    selectedCosplayers: [],
    manualQuantity: 0
  });
  return (
    <View style={styles.container}>
      {/* Header với hình nền */}
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/OIP.dzzgt55X2dFakNpTNtPoZQHaE8?rs=1&pid=ImgDetMain",
        }}
        style={styles.headerBackground}
      >
        {/* Lớp phủ mờ */}
        <View style={styles.overlay} />

        {/* Nội dung header */}
        <View style={styles.headerContent}>
          {/* Nút quay lại */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.headerTitle}>Event Organization</Text>
        </View>
      </ImageBackground>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        {[0, 1, 2, 3].map((step, index) => (
          <View
            key={index}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: currentStep === step ? "#007bff" : "#ccc",
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        {currentStep === 0 && (
          <EventStep1 goNextStep={(selectedPackage) => {
            setEventData(prev => ({ ...prev, selectedPackage }));
            setCurrentStep(1);
          }} />
        )}

        {currentStep === 1 && (
          <EventStep2
          goBackStep={() => setCurrentStep(0)}
          goNextStep={(details) => {
            setEventData(prev => ({ ...prev, ...details }));
            setCurrentStep(2);
          }}
        />
        
        )}

        {currentStep === 2 && (
          <EventStep3
          goBackStep={() => setCurrentStep(1)}
          goNextStep={({ useCosplayerList, selectedCosplayers, manualQuantity }) => {
            const updatedData = {
              useCosplayerList,
              selectedCosplayers,
              manualQuantity,
            };
          
            // Cập nhật xong thì mới chuyển step
            setEventData(prev => {
              const newData = { ...prev, ...updatedData };
              console.log("✅ Updated Event Data (before Step 4):", newData);
              // Chuyển step tại đây để đảm bảo cập nhật xong
              setCurrentStep(3);
              return newData;
            });
          }}
        />
        
        )}

        {currentStep === 3 && (
          <EventStep4
          eventData={eventData}
          
          goBackStep={() => setCurrentStep(2)}
          goNextStep={() => {
            console.log("Final data: ", eventData);
            // Xử lý submit
          }}
        />
        )}

      </View>
    </View>
  );
};

export default EventOrganization;
