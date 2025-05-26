import { apiClient } from "../../api/apiClient";

const RequestService = {
  // Lấy tất cả request
  getAllRequest: async () => {
    try {
      const response = await apiClient.get("/api/Request");
      return response.data;
    } catch (error) {
      console.error("Error fetching all requests:", error);
      throw error;
    }
  },

  // Lấy tất cả request theo accountId
  getAllRequestByAccount: async (accountId) => {
    try {
      const response = await apiClient.get("/api/Request/GetAllRequestByAccount", {
        params: { accountId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching requests by account:", error);
      throw error;
    }
  },

  // Lấy request theo id
  getRequestById: async (id) => {
    try {
      const response = await apiClient.get(`/api/Request/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching request by ID:", error);
      throw error;
    }
  },

  // Tạo mới request
  createRequest: async (requestDtos) => {
    try {
      const response = await apiClient.post("/api/Request", requestDtos);
      return response.data;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  // Cập nhật request
  updateRequest: async (requestId, updateRequestDtos) => {
    try {
      const response = await apiClient.put(`/api/Request?RequestId=${requestId}`, updateRequestDtos);
      return response.data;
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  },

  // Cập nhật trạng thái request
  updateStatusRequest: async (requestId, requestStatus) => {
    try {
      const response = await apiClient.put(`/api/Request/Status`, null, {
        params: { requestId },
        data: requestStatus, // nếu requestStatus là object
      });
      return response.data;
    } catch (error) {
      console.error("Error updating status of request:", error);
      throw error;
    }
  },

  // Xoá request
  deleteRequest: async (requestId) => {
    try {
      const response = await apiClient.delete(`/api/Request`, {
        params: { requestId },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting request:", error);
      throw error;
    }
  },

  // Tính tổng giá
  totalPriceRequest: async (params) => {
    const {
      packagePrice,
      accountCouponPrice,
      startDate,
      endDate,
      requestTotalPrices,
      serviceId,
    } = params;

    try {
      const response = await apiClient.post(`/api/Request/totalPrice`, {
        packagePrice,
        accountCouponPrice,
        startDate,
        endDate,
        requestTotalPrices,
        serviceId,
      });
      return response.data;
    } catch (error) {
      console.error("Error calculating total price:", error);
      throw error;
    }
  },

  // Kiểm tra request
  checkRequest: async (requestId) => {
    try {
      const response = await apiClient.get(`/api/Request/checkRequest`, {
        params: { requestId },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking request:", error);
      throw error;
    }
  },

  createRentalRequest: async (rentalRequest) => {
    try {
      const response = await apiClient.post("/api/Request/CreateRentCostume", rentalRequest);
      return response.data;
    } catch (error) {
      console.error("Error creating rental request:", error);
      throw error;
    }
  },

  
};

export default RequestService;
