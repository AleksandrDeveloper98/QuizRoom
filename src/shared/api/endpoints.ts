export const API_ENDPOINTS = {
  guestSession: {
    root: "/guest-sessions",
  },

  session: {
    root: "/session",
    me: "/session/me",
  },

  rooms: {
    root: "/rooms",
    join: (roomId: string) => `/rooms/${roomId}/join`,
    byId: (roomId: string) => `/rooms/${roomId}`,
    leave: (roomId: string) => `/rooms/${roomId}/players/me`,
  },
} as const;
