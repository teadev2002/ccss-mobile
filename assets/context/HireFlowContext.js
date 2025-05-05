import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HireFlowContext = createContext();

export const HireFlowProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [timeData, setTimeData] = useState({});
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [isResumable, setIsResumable] = useState(false);

  const STORAGE_KEY = "hireFlowData";

  // 🧩 Save context to AsyncStorage
  useEffect(() => {
    const saveData = async () => {
      const dataToStore = { formData, timeData, selectedPairs };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    };
    saveData();
  }, [formData, timeData, selectedPairs]);

  // 🔁 Load context từ AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.formData && parsed.timeData && parsed.selectedPairs) {
            setFormData(parsed.formData || {});
            setTimeData(parsed.timeData || {});
            setSelectedPairs(parsed.selectedPairs || []);
            setIsResumable(true); // 🔥 Đánh dấu có dữ liệu resume
          }
        } catch (e) {
          console.warn("Failed to parse saved HireFlow data:", e);
        }
      }
    };
    loadData();
  }, []);

  const resetHireFlow = async () => {
    setFormData({});
    setTimeData({});
    setSelectedPairs([]);
    setIsResumable(false);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <HireFlowContext.Provider
      value={{
        formData,
        setFormData,
        timeData,
        setTimeData,
        selectedPairs,
        setSelectedPairs,
        isResumable,
        setIsResumable,
        resetHireFlow,
      }}
    >
      {children}
    </HireFlowContext.Provider>
  );
};
