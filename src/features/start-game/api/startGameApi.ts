import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import {
  startGameResponseSchema,
  type TStartGameResponse,
} from "../model/startGameResponseSchema";

export const startGameApi = {
  startGame: async (roomId: string): Promise<TStartGameResponse> => {
    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.rooms.start(roomId)}`,
      {
        method: "POST",
      },
    );

    return startGameResponseSchema.parse(data);
  },
};
