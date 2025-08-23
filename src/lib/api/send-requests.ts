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
  } catch (error: unknown) {
    console.error("Error sending pairing request:", error);
    if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
      throw new Error((error.response as { data: { message?: string } }).data?.message || "Failed to send pairing request");
    }
    throw new Error("Failed to send pairing request");
  }
}