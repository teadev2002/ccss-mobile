import { apiClient } from "../../api/apiClient.js";

const orderService = {
  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post("/api/Order", orderData);
      const orderpaymentId = response.data;
      return orderpaymentId; 
    } catch (error) {
      throw new Error("Không thể tạo đơn hàng");
    }
  },

  // Kiểm tra trạng thái đơn hàng
  checkOrderStatus: async (orderpaymentId) => {
    try {
      const response = await apiClient.get(`/order/status/${orderpaymentId}`);
      return response.data?.status; // status = 0 (pending), 1 (complete), 2 (cancel)
    } catch (error) {
      throw new Error("Không thể kiểm tra trạng thái thanh toán");
    }
  },
};

export default orderService;
