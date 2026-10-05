import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { TSetReady } from "../model/types";

export const roomReadyApi = {
  setReady: async ({ roomId, ready }: TSetReady): Promise<void> => {
    await httpClient(`${API_BASE_URL}${API_ENDPOINTS.rooms.ready(roomId)}`, {
      method: "PATCH",
      body: JSON.stringify({ ready }),
    });
  },
};
