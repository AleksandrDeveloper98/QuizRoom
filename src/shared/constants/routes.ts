export const routes = {
  welcome: "/",

  rooms: "/rooms",
  createRoom: `/rooms/create`,
  roomById: (roomId: string) => `/rooms/${roomId}`,
} as const;
