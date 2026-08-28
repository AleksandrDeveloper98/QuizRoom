import { httpClient } from "@/shared/api/httpClient";
import {
  guestPlayerSchema,
  type TGuestPlayer,
} from "../model/guestPlayerSchema";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { HttpError } from "@/shared/api/httpError";

export const guestPlayerApi = {
  getCurrent: async (): Promise<TGuestPlayer | null> => {
    try {
      const data = await httpClient(
        `${API_BASE_URL}${API_ENDPOINTS.session.me}`,
        {
          method: "GET",
        },
      );

      return guestPlayerSchema.parse(data);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        return null;
      }

      throw error;
    }
  },
};
