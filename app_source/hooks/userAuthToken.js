import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("accessToken");
      setToken(storedToken);
    };
    loadToken();
  }, []);

  return token;
};

export default useAuthToken;
