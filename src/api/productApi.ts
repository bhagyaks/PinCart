import api from "./axios";

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
