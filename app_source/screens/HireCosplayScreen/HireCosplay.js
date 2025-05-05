import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppBarSimple from "../../components/appbar/SimpleAppBar";
import styles from "./styles/HireCosplayStyles";
import { HireFlowContext } from "../../../assets/context/HireFlowContext";

const HireCosplay = ({ navigation }) => {
  const { formData, setFormData, timeData, selectedPairs, isResumable, resetHireFlow } = useContext(HireFlowContext);
  const [errors, setErrors] = useState({});
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const checkResume = async () => {
      if (isResumable) {
        Alert.alert(
          "Resume Session",
          "You have an unfinished rental request. Do you want to continue?",
          [
            {
              text: "Start New",
              style: "destructive",
              onPress: async () => {
                await resetHireFlow();
              },
            },
            {
              text: "Continue",
              style: "default",
              onPress: () => {
                goToProperStep();
              },
            },
          ],
          { cancelable: false }
        );
      }
    };
    checkResume();
  }, [isResumable]);

  const goToProperStep = () => {
    if (!formData?.startDate) {
      return;
    }

    if (formData?.startDate && Object.keys(timeData || {}).length === 0) {
      navigation.replace("SelectTimeForDays");
      return;
    }

    if (formData?.startDate && Object.keys(timeData || {}).length > 0 && selectedPairs.length === 0) {
      navigation.replace("SelectCharacter");
      return;
    }

    if (selectedPairs.length > 0) {
      navigation.replace("ConfirmRequest");
    }
  };


  useEffect(() => {
    const fetchAccountId = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const accountId = decoded.Id || decoded.sub || decoded.userId;
        if (accountId) {
          setFormData((prev) => ({ ...prev, accountId }));
        }
      }
    };
    fetchAccountId();
  }, []);

  const today = moment().add(1, "day");
  const parsedStart = moment(formData.startDate, "DD-MM-YYYY", true);
  const maxEnd = parsedStart.isValid() ? parsedStart.clone().add(4, "days") : null;

  const validateDates = () => {
    const newErrors = {};
    const isStartValid = moment(formData.startDate, "DD-MM-YYYY", true);
    const isEndValid = moment(formData.endDate, "DD-MM-YYYY", true);
    const now = moment();

    if (!isStartValid.isValid()) newErrors.startDate = "Start date is invalid.";
    if (!isEndValid.isValid()) newErrors.endDate = "End date is invalid.";
    if (isStartValid.isSameOrBefore(now, "day"))
      newErrors.startDate = "Start date must be at least 1 day in the future.";
    if (isEndValid.isBefore(isStartValid))
      newErrors.endDate = "End date must be after start date.";
    if (isEndValid.diff(isStartValid, "days") > 4)
      newErrors.endDate = "Cannot exceed 5 days range.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateDates()) return;
    navigation.navigate("SelectTimeForDays");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBarSimple title="Hire Cosplayer - Step 1" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ width: "100%", maxWidth: 400 }}>
          <Text style={styles.sectionTitle}>Select Booking Dates</Text>

          {/* Start Date Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                value={formData.startDate}
                editable={false}
              />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={parsedStart.isValid() ? parsedStart.toDate() : today.toDate()}
                mode="date"
                display="default"
                minimumDate={today.toDate()}
                onChange={(e, date) => {
                  setShowStartDatePicker(false);
                  if (date) {
                    setFormData(prev => ({
                      ...prev,
                      startDate: moment(date).format("DD-MM-YYYY"),
                      endDate: "", // Reset end date when start date changes
                    }));
                  }
                }}
              />
            )}
            {errors.startDate && (
              <Text style={styles.errorText}>{errors.startDate}</Text>
            )}
          </View>

          {/* End Date Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                value={formData.endDate}
                editable={false}
              />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={
                  moment(formData.endDate, "DD-MM-YYYY", true).isValid()
                    ? moment(formData.endDate, "DD-MM-YYYY").toDate()
                    : maxEnd
                    ? maxEnd.toDate()
                    : today.toDate()
                }
                mode="date"
                display="default"
                minimumDate={parsedStart.isValid() ? parsedStart.toDate() : today.toDate()}
                maximumDate={maxEnd ? maxEnd.toDate() : undefined}
                onChange={(e, date) => {
                  setShowEndDatePicker(false);
                  if (date) {
                    setFormData(prev => ({
                      ...prev,
                      endDate: moment(date).format("DD-MM-YYYY"),
                    }));
                  }
                }}
              />
            )}
            {errors.endDate && (
              <Text style={styles.errorText}>{errors.endDate}</Text>
            )}
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <LinearGradient colors={["#510545", "#22668a"]} style={styles.gradientButton}>
              <Text style={styles.submitButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HireCosplay;

