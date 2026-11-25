export const routes = {
  welcome: "/",

  invite: "/invite/:roomId",
  inviteById: (roomId: string) => `/invite/${roomId}`,

  room: "/rooms/:roomId",
  roomById: (roomId: string) => `/rooms/${roomId}`,
  rooms: "/rooms",
  createRoom: "/rooms/create",
  updateRoomById: (roomId: string) => `/rooms/${roomId}/update`,
  updateRoom: "/rooms/:roomId/update",

  game: "/games/:gameId",
  gameById: (gameId: string) => `/games/${gameId}`,

  notFound: "*",
} as const;
