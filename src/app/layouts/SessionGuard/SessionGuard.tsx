import { matchPath, Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import PageLoader from "@/shared/ui/PageLoader";
import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";
import type { TSessionGuardProps } from "./types";

import "./SessionGuard.scss";

const SessionGuard = (props: TSessionGuardProps) => {
  const { access } = props;
  const {
    data: currentGuestPlayer,
    isPending,
    isError,
  } = useCurrentGuestPlayer();

  const location = useLocation();

  if (isPending) {
    return <PageLoader fullscreen />;
  }

  if (isError) {
    return (
      <div className="session-guard">
        <p className="session-guard__info">Не удалось проверить сессию</p>
        <Button className="session-guard__action" to={routes.welcome}>
          Вернуться назад
        </Button>
      </div>
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
