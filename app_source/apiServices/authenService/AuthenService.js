import { apiClient } from "../../api/apiClient";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/api/Auth", null, {
        params: { email, password },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      console.log("Login error:", errorMessage);

      // Ném lỗi ra ngoài với thông báo cụ thể
      throw new Error(errorMessage);
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
};

export default AuthService;
