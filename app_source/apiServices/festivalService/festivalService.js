import { apiClient } from "../../api/apiClient";
const FestivalService = {
  getAllFestivals: async () => {
    try {
      console.log("Fetching all festivals");

      const response = await apiClient.get("/api/Event/GetAllEvents");
      return response.data;
    } catch (error) {
      console.error("Error fetching festivals:", error.response?.data || error);
      if (error.response) {
        console.log("Response error:", error.response.data);
      }
      throw new Error(
        error.response?.data?.message || "Error fetching festivals"
      );
    }
  },

  getCosplayerByEventCharacterId: async (eventCharacterId) => {
    try {
      console.log(
        `Fetching cosplayer with eventCharacterId: ${eventCharacterId}`
      );
      const response = await apiClient.get(
        `/api/Account/GetAccountByEventCharacterId/${eventCharacterId}`
      );
      console.log("GetCosplayer response:", response.data);
      return response.data; 
    } catch (error) {
      console.error("Error fetching cosplayer:", error.response?.data || error);
      throw new Error(
        error.response?.data?.message || "Error fetching cosplayer"
      );
    }
  },

  getEventById: async (eventId) => {
    const response = await apiClient.get(`api/Event/GetEvent/${eventId}`);
    console.log("response Even: ", response.data);
    return response.data;
  },

  getCharaterById: async (id) => {
    try {
      const response = await apiClient.get(`/api/Character/${id}`);
      console.log("GetCosplayer response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cosplayer:", error.response?.data || error);
      throw new Error(
        error.response?.data?.message || "Error fetching cosplayer"
      );
    }
  },
};

export default FestivalService;
