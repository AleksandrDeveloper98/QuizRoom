import PlayerIdentity from "@/shared/ui/PlayerIdentity";
import "./LobbyPlayerCard.scss";
import type { TLobbyPlayerCardProps } from "./types";
import Badge from "@/shared/ui/Badge";

const LobbyPlayerCard = ({ player }: TLobbyPlayerCardProps) => {
  const { name, isReady, role } = player;

  return (
    <div className="lobby-player-card">
      <div className="lobby-player-card__info">
        <PlayerIdentity name={name} />
        {role === "host" && <Badge variant="violet">HOST</Badge>}
      </div>
      {
        <Badge variant={isReady ? "green" : "yellow"}>
          {isReady ? "Готов" : "Не готов"}
        </Badge>
      }
    </div>
  );
};

export default LobbyPlayerCard;
