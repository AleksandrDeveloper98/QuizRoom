import { httpClient } from "@/shared/api/httpClient";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { roomsListSchema, type TRoomsList } from "../model/roomsListSchema";
import type { TRoomsListParams } from "../model/types";
import {
  roomDetailsSchema,
  type TRoomDetails,
} from "../model/roomDetailsSchema";

export const roomApi = {
  getById: async (roomId: string): Promise<TRoomDetails> => {
    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.rooms.byId(roomId)}`,
      {
        method: "GET",
      },
    );

    return roomDetailsSchema.parse(data);
  },

  getList: async (params: TRoomsListParams): Promise<TRoomsList> => {
    const queryParams = new URLSearchParams({
      page: String(params.page),
      pageSize: String(params.pageSize),
    });

    if (params.search) {
      queryParams.set("search", params.search);
    }

    if (params.access) {
      queryParams.set("access", params.access);
    }

    const data = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.rooms.root}?${queryParams}`,
      {
        method: "GET",
      },
    );

    return roomsListSchema.parse(data);
  },
};
