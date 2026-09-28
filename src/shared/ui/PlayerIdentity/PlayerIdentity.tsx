import type { TPlayerIdentityProps } from "./types";

import "./PlayerIdentity.scss";

const PlayerIdentity = (props: TPlayerIdentityProps) => {
  const { name } = props;

  const firstChar = name.slice(0, 1).toUpperCase();

  return (
    <div className="player-identity">
      <span className="player-identity__circle">{firstChar}</span>
      <span className="player-identity__player">{name}</span>
    </div>
  );
};

export default PlayerIdentity;
