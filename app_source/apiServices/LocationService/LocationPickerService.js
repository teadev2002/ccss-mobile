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

  getAllDistricts: async (provinceId) => {
    try {
      const response = await apiClient.post(`/api/Delivery/districts/${provinceId}`);
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

  getAllProvinces: async () => {
  try {
    const response = await apiClient.get(`/api/Delivery/provinces`);
    if (response.data.code !== 200) {
      throw new Error(response.data.message || "Error fetching provinces");
    }
    const provinceList = response.data.data;
    const allProvinces = provinceList.map((province) => ({
      id: String(province.provinceId), // Ensure string
      name: province.provinceName,
    }));
    
    return allProvinces.slice(4);
  } catch (error) {
    console.error("Provinces error:", error);
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

  calculateDeliveryFee: async (orderId) => {
    try {
      // Log URL để debug
      const url = `/api/Delivery/caculate-fee-delivery/${orderId}`;
      console.log("Calling calculate delivery fee API:", url);
      const response = await apiClient.post(url);
      console.log("Delivery fee response:", response.data);
      return response.data; // Giả sử trả về số, ví dụ: 22000
    } catch (error) {
      // Log chi tiết lỗi để debug
      console.error("Calculate delivery fee error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error(
        error.response?.data?.message || "Error calculating delivery fee"
      );
    }
  },
};

export default LocationPickerService;
