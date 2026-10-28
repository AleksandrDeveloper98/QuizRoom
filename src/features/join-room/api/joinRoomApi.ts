import { httpClient } from "@/shared/api/httpClient";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type { TJoinRoomParams } from "../model/types";

export const joinRoomApi = {
  join: async ({ roomId, password }: TJoinRoomParams): Promise<void> => {
    await httpClient(`${API_BASE_URL}${API_ENDPOINTS.rooms.join(roomId)}`, {
      method: "POST",
      body: password ? JSON.stringify({ password }) : undefined,
    });
  },
};
