import { apiClient } from "../../api/apiClient";

const ProductService = {
  getProducts: async () => {
    try {
      const response = await apiClient.get("/api/Product");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching products"
      );
    }
  },

  getProductImages: async () => {
    try {
      const response = await apiClient.get("/api/ProductImage");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching product images"
      );
    }
  },

  getCombinedProductData: async () => {
    try {
      const [products, images] = await Promise.all([
        ProductService.getProducts(),
        ProductService.getProductImages(),
      ]);

      const combinedData = products
        .filter((product) => product.isActive)
        .map((product) => {
          const productImage = images.find(
            (img) => img.productId === product.productId
          );
          return {
            id: product.productId,
            name: product.productName,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            image: productImage
              ? productImage.urlImage
              : "https://via.placeholder.com/300",
          };
        });

      return combinedData;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching combined product data"
      );
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await apiClient.get(`/api/Product/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching product by ID"
      );
    }
  },

  updateProductQuantity: async (productId, newQuantity) => {
    try {
      const currentProduct = await ProductService.getProductById(productId);
      const payload = {
        productName: currentProduct.productName,
        description: currentProduct.description,
        quantity: newQuantity,
        price: currentProduct.price,
        isActive: currentProduct.isActive,
      };

      const response = await apiClient.put(
        `/api/Product?productId=${productId}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error updating product quantity"
      );
    }
  },
};

export default ProductService;
