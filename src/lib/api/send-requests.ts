import api from "./axios";
import { useAuthStore } from "@/store/authStore";

export interface PairingRequestPayload {
  recipientId: string;
  course: string;
}

export interface PairingRequestResponse {
  id: string;
  senderId: string;
  recipientId: string;
  email: string;
  course: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function sendPairingRequest(recipientId: string, course: string) {
  const token = useAuthStore.getState().access_token;
  if (!token) throw new Error("Authentication token is missing");

  try {
    const { data } = await api.post(
      "/prep-pals/requests",
      { recipientId, course },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error: any) {
    console.error("Error sending pairing request:", error);
    throw new Error(error?.response?.data?.message || "Failed to send pairing request");
  }
}