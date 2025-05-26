import { apiClient } from "../../api/apiClient";

const CharacterService = {
  getAllCharacters: async () => {
    try {
      const response = await apiClient.get("/api/character");
      return response.data;
    } catch (error) {
      console.error("Error fetching characters:", error);
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
};
export default CharacterService;
