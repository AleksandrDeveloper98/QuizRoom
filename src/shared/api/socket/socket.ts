import { io, type Socket } from "socket.io-client";
import type { TClientToServerEvents, TServerToClientEvents } from "./types";
import { SOCKET_URL } from "./socketUrl";

export const socket: Socket<TServerToClientEvents, TClientToServerEvents> = io(
  SOCKET_URL,
  {
    autoConnect: false,
    withCredentials: true,
  },
);
