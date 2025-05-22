import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./EventOrganizationStyles";
import EventStep1 from "./components/EventStep1";
import EventStep2 from "./components/EventStep2";
import EventStep3 from "./components/EventStep3";
import EventStep4 from "./components/EventStep4";
import { AuthContext } from "../../../assets/context/AuthContext";
import DetailEventOrganizationPageService from "../../apiServices/eventOrganizeService/DetailEventOrganizationPageService";

const EventOrganization = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState({
    selectedPackage: null,
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    priceRange: [15000, 50000],
    selectedCharacters: [],
    allCharacters: [],
  });

  const sendRequestEvent = async (data) => {
  try {
    const result = await DetailEventOrganizationPageService.sendRequestEventOrganization(data);
     alert("🎉 Event submitted successfully:");
     navigation.reset({ index: 0, routes: [{ name: "MainDrawer" }] });
  } catch (error) {
    console.error("🚨 Submit failed:", error.message);
    alert("Failed to create event: " + error.message);
  }
};


  const formatDateTime = (date, time) => `${date}T${time}:00`;

  const calculateEstimatedPrice = (data) => {
    const totalCharacter = data.selectedCharacters.reduce((sum, item) => {
      const price =
        data.allCharacters.find((c) => c.characterId === item.characterId)
          ?.price || 0;
      return sum + price * item.quantity;
    }, 0);

    const totalDays = Math.max(
      1,
      (new Date(data.endDate) - new Date(data.startDate)) /
        (1000 * 60 * 60 * 24) +
        1
    );

    return totalCharacter * totalDays + (data.selectedPackage?.price || 0);
  };

  const prepareSubmitData = (customData = eventData) => {
  const {
    selectedPackage,
    location,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    selectedCharacters,
    priceRange,
  } = customData;

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`; // trả về "DD/MM/YYYY"
  };

  const formatRequestDate = (date, time) => {
    return `${time} ${formatDate(date)}`; // trả về "HH:mm DD/MM/YYYY"
  };

  return {
    accountId: user?.id || "",
    name: selectedPackage?.packageName || "",
    description: description || "",
    price: calculateEstimatedPrice(customData),
    startDate: formatDate(startDate),   // "22/05/2025"
    endDate: formatDate(endDate),       // "22/05/2025"
    location,
    deposit: "30",
    packageId: selectedPackage?.packageId || "",
    range: `${priceRange[0]}-${priceRange[1]}`,
    listRequestCharactersCreateEvent: selectedCharacters.map((sc) => ({
      characterId: sc.characterId,
      description: sc.note || "",
      quantity: sc.quantity || 1,
      listRequestDates: [
        {
          startDate: formatRequestDate(startDate, startTime), // "08:00 22/05/2025"
          endDate: formatRequestDate(endDate, endTime),       // "21:00 22/05/2025"
        },
      ],
    })),
  };
};



  const updateEventData = (newFields, nextStep) => {
    setEventData((prev) => {
      const updated = { ...prev, ...newFields };
      console.log("✅ Updated Event Data:", updated);
      return updated;
    });
    setCurrentStep(nextStep);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/OIP.dzzgt55X2dFakNpTNtPoZQHaE8?rs=1&pid=ImgDetMain",
        }}
        style={styles.headerBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
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
        {[0, 1, 2, 3].map((step) => (
          <View
            key={step}
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

      <View style={styles.content}>
        {currentStep === 0 && (
          <EventStep1
            goNextStep={(selectedPackage) =>
              updateEventData({ selectedPackage }, 1)
            }
          />
        )}

        {currentStep === 1 && (
          <EventStep2
            goBackStep={() => setCurrentStep(0)}
            goNextStep={(step2Data) => updateEventData(step2Data, 2)}
          />
        )}

        {currentStep === 2 && (
          <EventStep3
            goBackStep={() => setCurrentStep(1)}
            goNextStep={({
              useCosplayerList,
              selectedCharacters,
              allCharacters,
            }) =>
              updateEventData(
                { useCosplayerList, selectedCharacters, allCharacters },
                3
              )
            }
          />
        )}

        {currentStep === 3 && (
          <EventStep4
            eventData={eventData}
            goBackStep={() => setCurrentStep(2)}
            goNextStep={(step4Data) => {
              updateEventData(step4Data, 4); // step 4 sẽ không hiển thị nên có thể bỏ qua, hoặc giữ nguyên
              const final = prepareSubmitData({ ...eventData, ...step4Data });
              console.log(
                "✅ Final Submission Data:\n",
                JSON.stringify(final, null, 2)
              );

              sendRequestEvent(final);
              // TODO: gửi API ở đây
            }}
          />
        )}
      </View>
    </View>
  );
};

export default EventOrganization;
