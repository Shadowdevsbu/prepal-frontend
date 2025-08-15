import api from "./axios";

export const getReceivedPreppals = async () => {
  try {
    const response = await api.get(`/prep-pals/requests/received`);
    return response.data;
  } catch (error) {
    console.error("Error fetching received prep-pals:", error);
    throw error;
  }
};
