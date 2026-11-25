import { Navigate, useParams } from "react-router-dom";
import UpdateRoomForm from "@/features/update-room-settings/ui/UpdateRoomForm";
import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import { useRoomQuery } from "@/entities/room/api/roomQueries";
import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";
import PageLoader from "@/shared/ui/PageLoader";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import "./UpdateRoomPage.scss";

const UpdateRoomPage = () => {
  const { roomId } = useParams();
  const roomQuery = useRoomQuery(roomId ?? "");
  const currentPlayerQuery = useCurrentGuestPlayer();

  if (!roomId) {
    return <Navigate to={routes.rooms} replace />;
  }

  if (roomQuery.isPending || currentPlayerQuery.isPending) {
    return <PageLoader fullscreen />;
  }

  if (roomQuery.isError || currentPlayerQuery.isError) {
    const handleRetry = () => {
      if (roomQuery.isError) {
        void roomQuery.refetch();
      }

      if (currentPlayerQuery.isError) {
        void currentPlayerQuery.refetch();
      }
    };

    return (
      <ErrorMessage
        title="Ошибка при загрузки данных"
        onRetry={handleRetry}
        isRetrying={roomQuery.isFetching || currentPlayerQuery.isFetching}
        backTo={routes.roomById(roomId)}
        backLabel="Вернуться в лобби"
      />
    );
  }

  const room = roomQuery.data;
  const currentPlayer = currentPlayerQuery.data;

  const isHost = room?.players.some(
    (player) => player.id === currentPlayer?.id && player.role === "host",
  );

  if (!isHost || room?.status !== "waiting") {
    return <Navigate to={routes.roomById(roomId)} replace />;
  }

  return (
    <section className="update-room-page">
      <div className="update-room-page__inner container">
        <UpdateRoomForm room={room} />

        <div className="update-room-page__actions">
          <Button to={routes.roomById(roomId)} variant="dark">
            Назад в лобби
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpdateRoomPage;
