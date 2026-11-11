import { httpClient } from "@/shared/api/httpClient";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { gameStateSchema, type TGameState } from "../model/gameStateSchema";

export const gameApi = {
  getById: async (gameId: string): Promise<TGameState> => {
    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.game.byId(gameId)}`,
      {
        method: "GET",
      },
    );

    return gameStateSchema.parse(data);
  },
};
