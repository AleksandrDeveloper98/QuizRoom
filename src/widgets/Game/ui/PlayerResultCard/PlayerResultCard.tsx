import clsx from "clsx";
import PlayerIdentity from "@/shared/ui/PlayerIdentity";
import type { TPlayerResultCardProps } from "./types";
import "./PlayerResultCard.scss";

const PlayerResultCard = (props: TPlayerResultCardProps) => {
  const { player, totalQuestions, currentPlayerId } = props;

  const isCurrentPlayer = currentPlayerId === player.playerId;

  return (
    <div
      className={clsx(
        "player-result-card",
        isCurrentPlayer && "player-result-card--current-player",
      )}
    >
      <div className="player-result-card__info">
        <span className="player-result-card__final-place">
          {player.finalPlace}
        </span>
        <PlayerIdentity name={player.name} />
      </div>
      <div className="player-result-card__results">
        <span>
          {player.correctAnswersCount} / {totalQuestions} правильных
        </span>
        <span>Очков: {player.score}</span>
      </div>
    </div>
  );
};

export default PlayerResultCard;
