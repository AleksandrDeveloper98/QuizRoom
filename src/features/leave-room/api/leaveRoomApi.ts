import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";

export const leaveRoomApi = {
  leaveRoomById: async (roomId: string): Promise<void> => {
    await httpClient(`${API_BASE_URL}${API_ENDPOINTS.rooms.leave(roomId)}`, {
      method: "DELETE",
    });
  },
};
