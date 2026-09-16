import {
  guestPlayerSchema,
  type TCreateGuestPlayer,
  type TGuestPlayer,
} from "@/entities/guestPlayer/model/guestPlayerSchema";
import { API_BASE_URL } from "@/shared/api/baseUrl";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";

export const guestSessionApi = {
  create: async (payload: TCreateGuestPlayer): Promise<TGuestPlayer> => {
    const response = await httpClient(
      `${API_BASE_URL}${API_ENDPOINTS.guestSession.root}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    return guestPlayerSchema.parse(response);
  },

  delete: async (): Promise<void> => {
    await httpClient(`${API_BASE_URL}${API_ENDPOINTS.session.root}`, {
      method: "DELETE",
    });
  },
};
