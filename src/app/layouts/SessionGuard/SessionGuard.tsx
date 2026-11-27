import { matchPath, Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import PageLoader from "@/shared/ui/PageLoader";
import { routes } from "@/shared/constants/routes";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import type { TSessionGuardProps } from "./types";

import "./SessionGuard.scss";

const SessionGuard = (props: TSessionGuardProps) => {
  const { access } = props;
  const {
    data: currentGuestPlayer,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useCurrentGuestPlayer();

  const location = useLocation();

  if (isPending) {
    return <PageLoader fullscreen />;
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Не удалось проверить сессию"
        description="Проверь подключение к интернету."
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  const hasSession = Boolean(currentGuestPlayer);

  if (access === "authenticated" && !hasSession) {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    const gameMatchPath = matchPath(routes.game, location.pathname);

    const returnToPath = gameMatchPath ? routes.rooms : currentPath;

    return (
      <Navigate
        to={routes.welcome}
        state={{ returnTo: returnToPath }}
        replace
      />
    );
  }

  if (access === "anonymous" && hasSession) {
    const savedPath = location.state?.returnTo;

    return <Navigate to={savedPath ?? routes.rooms} replace />;
  }

  return <Outlet />;
};

export default SessionGuard;
