import { useNavigate } from "react-router-dom";

import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";
import { useLogoutGuestSessionMutation } from "@/features/guestSession/api/guestSessionMutation";

const ButtonLogout = () => {
  const logoutMutation = useLogoutGuestSessionMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate(routes.welcome, { replace: true });
      },
    });
  };

  return (
    <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
      {logoutMutation.isPending ? "Подождите..." : "Выйти"}
    </Button>
  );
};

export default ButtonLogout;
