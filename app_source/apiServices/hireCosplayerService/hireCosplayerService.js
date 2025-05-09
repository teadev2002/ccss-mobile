
import { apiClient } from "../../api/apiClient.js";

const HireCosplayerService = {
  getAllCosplayers: async () => {
    try {
      const response = await apiClient.get("/api/Account/roleId/R004");
      // Đảm bảo dữ liệu trả về là mảng và có thuộc tính images
      return response.data.map((cosplayer) => ({
        ...cosplayer,
        images: cosplayer.images || [], // Nếu không có images, trả về mảng rỗng
      }));
    } catch (error) {
      console.error("Error fetching all cosplayers:", error);
      throw error;
    }
  },

  getAllCharacters: async () => {
    try {
      const response = await apiClient.get("/api/Character");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Lỗi khi lấy danh sách characters"
      );
    }
  },

  // from RequestService
  getNameCosplayerInRequestByCosplayerId: async (accountId) => {
    try {
      const response = await apiClient.get(`/api/Account/${accountId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cosplayer:", error);
      throw error;
    }
  },

  getHistoryByAccountId: async (accountId) => {
    try {
      const response = await apiClient.get(
        `/api/Request/GetAllRequestByAccount?accountId=${accountId}`
      );
      // console.log("response data: ", JSON.stringify(response.data, null, 2));
      // console.log("response data: ", response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
  },

  getAccountNoTaskByCharacterId: async (payload) => {
    try {
      const response = await apiClient.post("/api/Account/characterId/", payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching available accounts:", error);
      throw error;
    }
  },
  

  getAccountByCharacterNameNDate: async (characterName, startDate, endDate) => {
    try {
      // Xây dựng URL với characterName trong path và start/end trong query string
      const response = await apiClient.get(
        `/api/Account/characterName/${characterName}?start=${encodeURIComponent(
          startDate
        )}&end=${encodeURIComponent(endDate)}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching accounts by character name and date:",
        error
      );
      throw new Error(
        error.response?.data?.message ||
          "Lỗi khi lấy tài khoản theo tên nhân vật và ngày"
      );
    }
  },

  NewSendRequestHireCosplayer: async (requestData) => {
    try {
      // console.log("requestData: ", JSON.stringify(requestData, null, 2));

      const response = await apiClient.post(
        "/api/Request/CreateRentCosplayer",
        requestData
      );
      return response.data; // Trả về dữ liệu từ API (nếu có)
    } catch (error) {
      console.error("Error sending hire cosplayer request:", error);
      throw new Error(
        error.response?.data?.message || "Lỗi khi gửi yêu cầu thuê cosplayer"
      );
    }
  },

  
};

export default HireCosplayerService;
