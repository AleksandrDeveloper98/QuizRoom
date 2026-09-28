export const routes = {
  welcome: "/",

  room: "/rooms/:roomId",
  rooms: "/rooms",
  createRoom: `/rooms/create`,
  roomById: (roomId: string) => `/rooms/${roomId}`,

  notFound: "*",
} as const;
