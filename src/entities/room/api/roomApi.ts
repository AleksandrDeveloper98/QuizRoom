import { httpClient } from "@/shared/api/httpClient";
import { roomsListSchema, type TRoomsList } from "../model/roomsListSchema";
import type { TRoomsListParams } from "../model/types";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { roomSchema, type TCreateRoom, type TRoom } from "../model/roomSchema";

export const roomApi = {
  getList: async (params: TRoomsListParams): Promise<TRoomsList> => {
    const searchParams = new URLSearchParams({
      page: String(params.page),
      pageSize: String(params.pageSize),
    });

    if (params.search) {
      searchParams.set("search", params.search);
    }

    if (params.access) {
      searchParams.set("access", params.access);
    }

    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.rooms.root}?${searchParams}`,
      {
        method: "GET",
      },
    );

    return roomsListSchema.parse(data);
  },

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
