import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";

export const leaveGameApi = {
  leaveGameById: async (gameId: string): Promise<void> => {
    await httpClient(`${API_BASE_URL}${API_ENDPOINTS.game.leave(gameId)}`, {
      method: "DELETE",
    });
  },
};
