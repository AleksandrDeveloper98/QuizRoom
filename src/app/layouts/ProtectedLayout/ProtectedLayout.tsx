import { Navigate, Outlet } from "react-router-dom";
import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import PageLoader from "@/shared/ui/PageLoader";
import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";

import "./ProtectedLayout.scss";

const ProtectedLayout = () => {
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
      <div className="protected-layout">
        <p className="protected-layout__info">Не удалось проверить сессию</p>
        <Button className="protected-layout__action" to={routes.welcome}>
          Вернуться назад
        </Button>
      </div>
    );
  }

  if (!currentGuestPlayer) {
    return <Navigate to={routes.welcome} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
