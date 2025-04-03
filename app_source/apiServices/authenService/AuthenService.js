import { apiClient } from "../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthenService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/api/Auth", null, {
        params: { email, password },
      });
      const tokens = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
      await AsyncStorage.setItem("accessToken", tokens.accessToken);
      await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  signup: async (name, email, password, birthday, phone) => {
    try {
      const response = await apiClient.post("/api/Auth/register", {
        name,
        email,
        password,
        description: "New user",
        birthday,
        phone,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Sign up failed");
    }
  },

  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem("accessToken");
    return !!token;
  },

  getTokens: async () => {
    return {
      accessToken: await AsyncStorage.getItem("accessToken"),
      refreshToken: await AsyncStorage.getItem("refreshToken"),
    };
  },

  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("cartId");
    await AsyncStorage.removeItem("accountId");
  },
};

export default AuthenService;
