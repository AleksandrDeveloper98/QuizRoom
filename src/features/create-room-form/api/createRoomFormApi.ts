import { roomSchema, type TCreateRoom, type TRoom } from "@/entities/room/model/roomSchema";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";

export const createRoomFormApi = {
  create: async (room: TCreateRoom): Promise<TRoom> => {
    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.rooms.root}`,
      {
        method: "POST",
        body: JSON.stringify(room),
      },
    );

    return roomSchema.parse(data);
  },
};
