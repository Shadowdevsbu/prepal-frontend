import { useAuthStore } from "@/store/authStore";
import api from "./axios";

export const getCurrentPreppals = async () => {
  try {
    const token = useAuthStore.getState().access_token; // get the token
    const response = await api.get(`/prep-pals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current prep-pals:", error);
    throw error;
  }
};