import { apiClient } from "../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
};
export default CharacterService;
