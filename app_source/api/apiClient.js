import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  "https://beccss-brhnhugne7d5d3aj.southeastasia-01.azurewebsites.net";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await apiClient.post("/api/Auth/refresh", {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;
          await AsyncStorage.setItem("accessToken", newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(error.config);
        } catch (refreshError) {
          await AuthenService.logout();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

const createFormDataClient = (config = {}) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      ...config.headers,
    },
  });
};

const formDataClient = createFormDataClient();
formDataClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiClient, formDataClient };
