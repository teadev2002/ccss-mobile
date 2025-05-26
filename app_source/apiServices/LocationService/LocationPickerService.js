// src/services/LocationPickerService.js
import Toast from "react-native-toast-message";
import { apiClient } from "../../api/apiClient.js";



const LocationPickerService = {
  getDistricts: async () => {
    try {
      const response = await apiClient.post(`/api/Delivery/districts/202`);
      if (response.data.code !== 200) {
        throw new Error(response.data.message || "Error fetching districts");
      }
      const districts = response.data.data.map((district) => ({
        id: String(district.districtId), // Ensure string
        name: district.districtName,
      }));
      return districts;
    } catch (error) {
      console.error("Districts error:", error);
      Toast.error(error.message);
      throw error;
    }
  },

  getStreets: async (districtId) => {
    try {
      const response = await apiClient.post(
        `/api/Delivery/wards/${districtId}`
      );
      if (response.data.code !== 200) {
        throw new Error(response.data.message || "Error fetching streets");
      }
      const streets =
        response.data.data && Array.isArray(response.data.data)
          ? response.data.data.map((street, index) => ({
              id: String(street.wardId || `fallback-${index}`), // Fallback for missing wardId
              name: street.wardName || "Unknown Street",
            }))
          : [];
      // Check for duplicate IDs
      const uniqueIds = new Set(streets.map((s) => s.id));
      if (uniqueIds.size !== streets.length) {
        console.warn("Duplicate street IDs detected:", streets);
        Toast.warn("Duplicate street IDs found. Contact support.");
      }
      console.log("Streets fetched:", streets);
      if (streets.length === 0) {
        Toast.warn("No streets found for this district.");
      }
      return streets;
    } catch (error) {
      console.error("Streets error:", error);
      Toast.error(error.message || "Failed to fetch streets");
      return [];
    }
  },
};

export default LocationPickerService;
