import { Navigate, useParams } from "react-router-dom";
import "./RoomPage.scss";
import Lobby from "@/widgets/Lobby";
import { routes } from "@/shared/constants/routes";
import { useRoomQuery } from "@/entities/room/api/roomQueries";
import PageLoader from "@/shared/ui/PageLoader";

const RoomPage = () => {
  const { roomId = "" } = useParams();

  const { data: room, isPending, isError } = useRoomQuery(roomId);

  if (!roomId) {
    return <Navigate to={routes.rooms} replace />;
  }

  if (isPending) {
    return <PageLoader />;
  } else if (isError) {
    return <p>Не удалось загрузить параметры игры</p>;
  }

  return <Lobby room={room} roomId={roomId} />;
};

export default RoomPage;
