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

    console.log("API raw response:", response.data);

    // Normalize: sometimes backend may wrap it
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.suggestions && Array.isArray(response.data.suggestions)) {
      return response.data.suggestions;
    }
    return [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}