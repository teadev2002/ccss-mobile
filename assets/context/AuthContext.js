import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { apiClient } from "../../app_source/api/apiClient";
import { navigate } from "../../app_source/apiServices/NavigationService";
import SplashScreen from "../../app_source/components/common/SplashScreen";
import { useNavigation } from "@react-navigation/native";
import { handleError, handleSuccess, handleInfo } from '../../app_source/utils/handleMessage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadUserData().finally(() => setIsAuthLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate("MainDrawer");
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) return;

      const isExpired = isTokenExpired(accessToken);
      if (isExpired) {
        const newToken = await refreshToken();
        if (newToken) {
          const decoded = jwtDecode(newToken);
          setUserFromDecodedToken(decoded);
        }
      } else {
        const decoded = jwtDecode(accessToken);
        setUserFromDecodedToken(decoded);
      }
    } catch (error) {
      handleError(error, "Failed to load user data");
    }
  };

  const setUserFromDecodedToken = (decoded) => {
    try {
      setUser({
        id: decoded.Id,
        accountName: decoded.AccountName,
        email: decoded.Email,
        role: decoded.role,
      });
    } catch (error) {
      handleError(error, "Unable to set user information");
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      handleError(error, "Failed to check token expiration");
      return true;
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const token = await AsyncStorage.getItem("accessToken");

      if (!refreshToken) throw new Error("Refresh token not found");

      const response = await apiClient.post("/api/Auth/refresh", { token, refreshToken });
      const newAccessToken = response.data.accessToken;

      await AsyncStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      await logout();
      handleError(error, "Session expired. Please log in again");
      navigate("Login");
      return null;
    }
  };

  const login = async (tokens) => {
    try {
      await AsyncStorage.setItem("accessToken", tokens.accessToken);
      await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
      const decoded = jwtDecode(tokens.accessToken);
      setUserFromDecodedToken(decoded);
      handleSuccess("Login successful 🎉");
    } catch (error) {
      handleError(error, "Login failed");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "cartId", "accountId"]);
      setUser(null);
      handleInfo("Logged out successfully");
    } catch (error) {
      handleError(error, "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {isAuthLoading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
