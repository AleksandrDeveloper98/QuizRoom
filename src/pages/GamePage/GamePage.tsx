import { Navigate, useParams } from "react-router-dom";
import Game from "@/widgets/Game";
import { useGameQuery } from "@/entities/game/api/gameQueries";
import PageLoader from "@/shared/ui/PageLoader";
import { routes } from "@/shared/constants/routes";
import { useGameRealTime } from "@/entities/game/api/gameRealtime";
import ErrorMessage from "@/shared/ui/ErrorMessage";

const GamePage = () => {
  const { gameId } = useParams();
  const {
    data: game,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useGameQuery(gameId ?? "");

  useGameRealTime(gameId ?? "");

  if (!gameId) {
    return <Navigate to={routes.rooms} replace />;
  }

  if (isPending) {
    return <PageLoader fullscreen />;
  }
  if (isError) {
    return (
      <ErrorMessage
        title="Ошибка в игре"
        onRetry={refetch}
        isRetrying={isFetching}
      />
    );
  }

  return <Game game={game} />;
};

export default GamePage;
