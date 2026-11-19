import { useLogoutGuestSessionMutation } from "@/features/guest-session/api/guestSessionMutation";
import Button from "@/shared/ui/Button";
import BlockingLoader from "@/shared/ui/BlockingLoader";

const ButtonLogout = () => {
  const logoutMutation = useLogoutGuestSessionMutation();
  const handleLogout = () => {
    logoutMutation.mutate();
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
