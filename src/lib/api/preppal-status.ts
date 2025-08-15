import { useAuthStore } from "@/store/authStore";
import api from "./axios";

export async function prepPalStatus(requestId: string, status: string) {
    try {
        const token = useAuthStore.getState().access_token;
        const response = await api.put(`/prep-pals/requests/${requestId}`, {
            status: status
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;

    } catch (error) {
        console.error("Error updating pal status:", error);
        throw error;
    }
}