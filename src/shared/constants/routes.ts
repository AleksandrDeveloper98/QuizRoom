export const routes = {
  welcome: "/",

  invite: "/invite/:roomId",
  inviteById: (roomId: string) => `/invite/${roomId}`,

  room: "/rooms/:roomId",
  roomById: (roomId: string) => `/rooms/${roomId}`,

  rooms: "/rooms",
  createRoom: `/rooms/create`,

  notFound: "*",
} as const;
