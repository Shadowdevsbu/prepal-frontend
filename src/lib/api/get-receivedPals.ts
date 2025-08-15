import { useAuthStore } from "@/store/authStore";
import api from "./axios";

export const getReceivedPreppals = async () => {
  try {
    const token = useAuthStore.getState().access_token; // get the token
    const response = await api.get(`/prep-pals/requests/received`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching received prep-pals:", error);
    throw error;
  }
};