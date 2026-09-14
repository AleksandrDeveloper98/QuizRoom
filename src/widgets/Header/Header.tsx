import Logo from "@/shared/ui/Logo";

import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import Spinner from "@/shared/ui/Spinner";
import type { ReactNode } from "react";
import "./Header.scss";

const Header = () => {
  const { data: currentPlayer, isPending, isError } = useCurrentGuestPlayer();

  let playerContent: ReactNode = null;

  if (isPending) {
    playerContent = <Spinner size="small" />;
  } else if (!isError) {
    playerContent = currentPlayer?.name ?? null;
  }

  return (
    <header className="header">
      <div className="header__inner container">
        <Logo className="header__logo" />
        <div className="header__info">
          <p className="header__name">{playerContent} </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
