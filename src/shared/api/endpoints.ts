export const API_ENDPOINTS = {
  guestSession: {
    root: "/guest-sessions",
  },

  session: {
    root: "/session",
    me: "/session/me",
  },
} as const;
