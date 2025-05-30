
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

  getCharacterById: async (characterId) => {
    try {
      const response = await apiClient.get(`/api/Character/${characterId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Lỗi khi lấy thông tin character"
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
      // console.log("abc",JSON.stringify(response.data,null,2));
      
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
      console.log("Data trả về: ", JSON.stringify(response.data, null, 2));
      
      return response.data; // Trả về dữ liệu từ API (nếu có)
    } catch (error) {
      console.error("Error sending hire cosplayer request:", error);
      throw new Error(
        error.response?.data?.message || "Lỗi khi gửi yêu cầu thuê cosplayer"
      );
    }
  },

  ChangeCosplayer: async (data) => {
    try {
      const response = await apiClient.post(`/api/Account/characterId`, data);
      console.log("abccccccccccccccccc",response.data);
      return response.data;
    } catch (error) {
      console.error("Error changing cosplayer:", error);
      throw error;
    }
  },

  editRequest: async (requestId, data) => {
    try {
      const response = await apiClient.put(
        `/api/Request?RequestId=${requestId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  },

  // ChangeCosplayer: async (requestCharacterId,data) => {
  //   try {
  //     const response = await apiClient.put(`/api/RequestCharacter/${requestCharacterId}`, data);
  //     console.log("abccccccccccccccccc",response.data);
      
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error changing cosplayer:", error);
  //     throw error;
  //   }
  // },

  
};

export default HireCosplayerService;
