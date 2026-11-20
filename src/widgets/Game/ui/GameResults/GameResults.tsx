import Icon from "@/shared/ui/Icon";
import Cup from "@/shared/assets/icons/cup.svg?react";
import PlayerIdentity from "@/shared/ui/PlayerIdentity";
import Button from "@/shared/ui/Button";
import { routes } from "@/shared/constants/routes";
import type { TGameResultsProps } from "./types";
import PlayerResultCard from "../PlayerResultCard";
import "./GameResults.scss";

const GameResults = (props: TGameResultsProps) => {
  const { players, roomId, totalQuestions, currentPlayerId } = props;

  const titleId = "game-results-title";

  const winner = players.find(
    (player) => player.finalPlace === 1,
  );

  return (
    <section className="game-results" aria-labelledby={titleId}>
      <div className="game-results__inner">
        <div className="game-results__header">
          <span className="game-results__subtitle">ИГРА ОКОНЧЕНА</span>
          <h1 className="game-results__title" id={titleId}>
            Победитель
          </h1>
        </div>
        <div className="game-results__leader">
          <Icon className="game-results__icon-cup" icon={Cup} size={40} />
          <PlayerIdentity
            direction="col"
            name={winner?.name ?? ""}
          />
          <p className="game-results__total-points">
            Очков: {winner?.score}
          </p>
        </div>
        <div className="game-results__leaderboard">
          <p className="game-results__leaderboard-title">Итоговый рейтинг</p>
          <ul className="game-results__leaderboard-list">
            {players.map((player) => (
              <li
                className="game-results__leaderboard-item"
                key={player.playerId}
              >
                <PlayerResultCard
                  player={player}
                  totalQuestions={totalQuestions}
                  currentPlayerId={currentPlayerId}
                />
              </li>
            ))}
          </ul>
        </div>
        <Button to={routes.roomById(roomId)}>Вернуться в лобби</Button>
      </div>
    </section>
  );
};

export default GameResults;
