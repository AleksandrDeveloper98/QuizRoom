import { useNavigate } from "react-router-dom";
import { useLogoutGuestSessionMutation } from "@/features/guest-session/api/guestSessionMutation";
import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";
import BlockingLoader from "@/shared/ui/BlockingLoader";

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
    <>
      <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
        {logoutMutation.isPending ? "Подождите..." : "Выйти"}
      </Button>
      
      {logoutMutation.isPending && <BlockingLoader />}
    </>
  );
};

export default ButtonLogout;
