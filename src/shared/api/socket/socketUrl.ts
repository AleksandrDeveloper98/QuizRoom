const socketUrl = import.meta.env.VITE_SOCKET_URL;

if (!socketUrl) {
  throw new Error("VITE_SOCKET_URL is not defined");
}

export const SOCKET_URL = socketUrl;
