import { httpClient } from "@/shared/api/httpClient";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { gameStateSchema, type TGameState } from "../model/gameStateSchema";
import type { TSubmitAnswerVariables } from "../model/types";

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

  submitAnswer: async ({
    gameId,
    payload,
  }: TSubmitAnswerVariables): Promise<void> => {
    await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.game.submitAnswer(gameId)}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
  },
};
