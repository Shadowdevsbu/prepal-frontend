import api from "./axios";
import { useAuthStore } from "@/store/authStore";

export async function getSuggestions(course: string) {
  try {
    const token = useAuthStore.getState().access_token;
    const response = await api.get(`/prep-pals/suggestions`, {
      params: { course },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}
