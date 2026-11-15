import GamePlayerCard from "../GamePlayerCard";
import type { TGameLeaderboardProps } from "./types";

import "./GameLeaderboard.scss";

const GameLeaderboard = (props: TGameLeaderboardProps) => {
  const { players } = props;
  return (
    <aside className="game-leaderboard">
      <p className="game-leaderboard__title">Рейтинг</p>
      <ul className="game-leaderboard__list">
        {players.map((player, index) => (
          <li className="game-leaderboard__item" key={player.playerId}>
            <GamePlayerCard player={player} position={index + 1} />
          </li>
        ))}
      </ul>

      <div className="game-leaderboard__info">
        <p>Чем быстрее правильный ответ - тем больше очков.</p>
      </div>
    </aside>
  );
};

export default GameLeaderboard;
