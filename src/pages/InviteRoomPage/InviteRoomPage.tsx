import { Navigate, useParams } from "react-router-dom";
import InviteRoom from "@/widgets/InviteRoom";
import { routes } from "@/shared/constants/routes";

const InviteRoomPage = () => {
  const { roomId } = useParams();

  if (!roomId) {
    return <Navigate to={routes.rooms} replace />;
  }

  return <InviteRoom roomId={roomId} />;
};

export default InviteRoomPage;
