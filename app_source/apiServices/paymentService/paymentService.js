import { apiClient } from "../../api/apiClient.js";

const PaymentService = {
  createMomoPayment: async (paymentData) => {
    try {
      console.log("Creating MoMo payment with data:", paymentData);
      const response = await apiClient.post("/api/Momo", paymentData);
      console.log("CreateMomoPayment response:", response.data);
      return response.data; // Trả về URL thanh toán từ MoMo
    } catch (error) {
      console.error(
        "Error creating MoMo payment:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error creating MoMo payment"
      );
    }
  },

  createVnpayPayment: async (paymentData) => {
    try {
      console.log("Creating VNPay payment with data:", paymentData);
      const response = await apiClient.post("/api/VNPay", paymentData);
      console.log("CreateVnpayPayment response:", response.data);
      return { url: response.data } // Trả về URL thanh toán từ VNPay
    } catch (error) {
      console.error(
        "Error creating VNPay payment:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error creating VNPay payment"
      );
    }
  },

  DepositPayment: async ({
    fullName,
    // orderId,
    orderInfo = "",
    amount,
    purpose = 1, // chọn cọc deposit
    accountId,
    // accountCouponId = null,
    // ticketId,
    // ticketQuantity,
    contractId,
    // orderpaymentId,
  }) => {
    try {
      const requestBody = {
        fullName,
        // orderId,
        orderInfo,
        amount,
        purpose,
        accountId,
        // accountCouponId,
        // ticketId,
        // ticketQuantity,
        contractId,
        isWeb: false,
        // orderpaymentId,
      };

      // Gửi yêu cầu POST tới endpoint /api/Momo
      const response = await apiClient.post("/api/VNPay", requestBody);

      // Trả về URL thanh toán từ response
      return response.data;
    } catch (error) {
      // Xử lý lỗi chi tiết hơn
      if (error.response) {
        // Lỗi từ server (có response)
        if (error.response.status === 401) {
          throw new Error(
            "Unauthorized: Invalid or expired token. Please log in again."
          );
        }
        console.error(
          "API Error:",
          error.response.data || error.response.statusText
        );
        throw new Error(
          error.response.data?.message || "Failed to initiate payment."
        );
      } else if (error.request) {
        // Không nhận được response (lỗi mạng)
        console.error("Network Error:", error.request);
        throw new Error(
          "Network error: Unable to connect to the payment server."
        );
      } else {
        // Lỗi khác (cấu hình, logic)
        console.error("Error in DepositPayment:", error.message);
        throw error;
      }
    }
  },

};

export default PaymentService;
