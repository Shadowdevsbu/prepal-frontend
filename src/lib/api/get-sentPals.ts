import { useAuthStore } from "@/store/authStore";
import api from "./axios";

export const getSentPreppals = async () => {
  try {
    const token = useAuthStore.getState().access_token;
    const response = await api.get(`/prep-pals/requests/sent`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sent prep-pals:", error);
    throw error;
  }
};
