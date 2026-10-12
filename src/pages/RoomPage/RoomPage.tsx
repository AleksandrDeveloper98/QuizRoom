import { Navigate, useParams } from "react-router-dom";
import Lobby from "@/widgets/Lobby";
import { useRoomQuery } from "@/entities/room/api/roomQueries";
import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import { routes } from "@/shared/constants/routes";
import PageLoader from "@/shared/ui/PageLoader";

import "./RoomPage.scss";
import { useRoomRealtime } from "@/entities/room/api/roomRealtime";

const RoomPage = () => {
  const { roomId = "" } = useParams();

  useRoomRealtime(roomId);
  const roomQuery = useRoomQuery(roomId);
  const currentGuestPlayerQuery = useCurrentGuestPlayer();

  if (!roomId) {
    return <Navigate to={routes.rooms} replace />;
  }

  if (roomQuery.isPending || currentGuestPlayerQuery.isPending) {
    return <PageLoader />;
  }

  if (roomQuery.isError || currentGuestPlayerQuery.isError) {
    return <p>Не удалось загрузить данные комнаты</p>;
  }

  const room = roomQuery.data;
  const currentGuestPlayer = currentGuestPlayerQuery.data;

  if (!currentGuestPlayer) {
    return <Navigate to={routes.welcome} replace />;
  }

  const currentPlayer = room.players.find(
    (player) => player.id === currentGuestPlayer.id,
  );

  if (!currentPlayer) {
    return <Navigate to={routes.rooms} replace />;
  }

  return <Lobby room={room} roomId={roomId} currentPlayer={currentPlayer} />;
};

export default RoomPage;
