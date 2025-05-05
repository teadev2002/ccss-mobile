import { apiClient, formDataClient } from "../../api/apiClient.js";

const hireHistoryService = {
  gotoHistoryByAccountId: async (accountId) => {
    try {
      const response = await apiClient.get(`/api/Account/${accountId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Lỗi khi vào history");
    }
  },

  GetAllRequestByAccountId: async (accountId) => {
    try {
      const response = await apiClient.get(
        `/api/Request/GetAllRequestByAccount?accountId=${accountId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
  },

  getRequestByRequestId: async (id) => {
    try {
      const response = await apiClient.get(`/api/Request/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching request:", error);
      throw error;
    }
  },

  depositRequest: async (id, num) => {
    try {
      const response = await apiClient.post(
        `/api/Contract?requestId=${id}&deposit=${num}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching request:", error);
      throw error;
    }
  },

  getAllContractByAccountId: async (accountId) => {
    try {
      const response = await apiClient.get(
        `/api/Contract/accountId/${accountId}`
      );
      // console.log("contract", response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching contract:", error);
      throw error;
    }
  },

  updateStatusContract: async (contractId, status) => {
    try {
      const response = await apiClient.put(
        `/api/Contract?contracId=${contractId}&status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating contract status:",
        error.response ? error.response.data : error.message
      );
      throw error;
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

  ChangeCosplayer: async (data) => {
    try {
      const response = await apiClient.post(`/api/Account/characterId`, data);
      return response.data;
    } catch (error) {
      console.error("Error changing cosplayer:", error);
      throw error;
    }
  },

  // Hàm mới để lấy danh sách cosplayer dựa trên characterId và khoảng thời gian
  getAvailableCosplayersByCharacterId: async (
    characterId,
    startDate,
    endDate
  ) => {
    try {
      const response = await apiClient.get(
        `/api/Account/characterId?characterId=${characterId}&startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available cosplayers:", error);
      throw error;
    }
  },

  // Hàm mới để lấy danh sách cosplayer dựa trên tên nhân vật và khoảng thời gian
  getCosplayersByCharacterNameAndDate: async (
    characterName,
    startDate,
    endDate
  ) => {
    try {
      const response = await apiClient.get(
        `/api/Account/characterName/${characterName}?start=${encodeURIComponent(
          startDate
        )}&end=${encodeURIComponent(endDate)}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching cosplayers by character name and date:",
        error
      );
      throw error;
    }
  },

  // Hàm mới để lấy tất cả cosplayer (dùng để lọc ban đầu nếu cần)
  getAllCosplayers: async () => {
    try {
      const response = await apiClient.get("/api/Account/roleId/R004");
      return response.data.map((cosplayer) => ({
        ...cosplayer,
        images: cosplayer.images || [],
      }));
    } catch (error) {
      console.error("Error fetching all cosplayers:", error);
      throw error;
    }
  },
  getContractCharacters: async (contractId) => {
    try {
      const response = await apiClient.get(
        `/api/ContractCharacter?contractId=${contractId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching contract characters:", error);
      throw error;
    }
  },
  createFeedback: async (accountId, contractId, data) => {
    try {
      const response = await apiClient.post(
        `/api/Feedback?accountId=${accountId}&contractId=${contractId}`,
        data.feedbacks
      );
      return response.data;
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  },
  getContractCharacterByContractId: async (contractId) => {
    try {
      const response = await apiClient.get(
        `/api/ContractCharacter?contractId=${contractId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching contract characters:", error);
      throw error;
    }
  },
  getFeedbackByContractId: async (contractId) => {
    try {
      const feedbackResponse = await apiClient.get(
        `/api/Feedback/contractId/${contractId}`
      );
      return {
        feedbacks: feedbackResponse.data,
      };

      
    } catch (error) {
      console.error("Error fetching feedback by account ID:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch feedback for contract"
      );
    }
  },
};
export default hireHistoryService;
