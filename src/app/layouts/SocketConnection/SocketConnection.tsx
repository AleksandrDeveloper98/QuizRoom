import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "@/shared/api/socket/socket";

const SocketConnection = () => {
  useEffect(() => {
    const handleConnect = () => {
      if (import.meta.env.DEV) {
        console.log("[socket] connected:", socket.id);
      }
    };

    const handleDisconnect = (reason: string) => {
      if (import.meta.env.DEV) {
        console.log("[socket] disconnected:", reason);
      }
    };

    const handleConnectError = (error: Error) => {
      if (import.meta.env.DEV) {
        console.error("[socket] connect error:", error.message);
      }
    };

    socket.on("connect", handleConnect);

    socket.on("disconnect", handleDisconnect);

    socket.on("connect_error", handleConnectError);

    socket.connect();

    return () => {
      socket.disconnect();
      
      socket.off("connect", handleConnect);

      socket.off("disconnect", handleDisconnect);

      socket.off("connect_error", handleConnectError);

    };
  }, []);

  return <Outlet />;
};

export default SocketConnection;
