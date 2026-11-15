import Badge from "@/shared/ui/Badge";
import PlayerIdentity from "@/shared/ui/PlayerIdentity";
import type { TGamePlayerCardProps } from "./types";
import "./GamePlayerCard.scss";

const GamePlayerCard = (props: TGamePlayerCardProps) => {
  const { player, position } = props;
  return (
    <div className="game-player-card">
      <span className="game-player-card__position">{position}</span>
      <div className="game-player-card__body">
        <PlayerIdentity name={player.name} />
        <div className="game-player-card__info">
          <span className="game-player-card__points">{player.score}</span>
          <Badge variant={player.hasAnswered ? "green" : "transparent-gray"}>
            {player.hasAnswered ? "Ответил" : "Думает..."}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default GamePlayerCard;
