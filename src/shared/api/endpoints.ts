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
    ready: (roomId: string) => `/rooms/${roomId}/players/me/ready`,
    start: (roomId: string) => `/rooms/${roomId}/start`,
  },

  game: {
    leave: (gameId: string) => `/games/${gameId}/players/me`,
    byId: (gameId: string) => `/games/${gameId}`,
    submitAnswer : (gameId: string) => `/games/${gameId}/answers`,
  },
} as const;
