import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import {
  roomDetailsSchema,
  type TRoomDetails,
} from "@/entities/room/model/roomDetailsSchema";
import type { TUpdateRoomVariables } from "../model/types";

export const updateRoomApi = {
  update: async ({
    roomId,
    payload,
  }: TUpdateRoomVariables): Promise<TRoomDetails> => {
    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.rooms.update(roomId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );

    return roomDetailsSchema.parse(data);
  },
};
