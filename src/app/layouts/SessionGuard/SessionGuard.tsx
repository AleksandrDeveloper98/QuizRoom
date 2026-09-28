import { Navigate, Outlet } from "react-router-dom";
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
    return <Navigate to={routes.welcome} replace />;
  }

  if (access === "anonymous" && hasSession) {
    return <Navigate to={routes.rooms} replace />;
  }

  return <Outlet />;
};

export default SessionGuard;
