import LobbyPlayerCard from "@/widgets/Lobby/ui/LobbyPlayerCard";
import type { TLobbyPlayersPanelProps } from "./types";

import "./LobbyPlayersPanel.scss";
import Badge from "@/shared/ui/Badge";

const LobbyPlayersPanel = (props: TLobbyPlayersPanelProps) => {
  const { players } = props;

  const readyPlayersCount = players.filter((player) => player.isReady).length;

  return (
    <div className="lobby-players-panel">
      <div className="lobby-players-panel__header">
        <h2 className="lobby-players-panel__title h4">Игроки</h2>
        <Badge
          variant="green"
          children={`${readyPlayersCount} из ${players.length} готовы`}
        />
      </div>
      <ul className="lobby-players-panel__list">
        {players.map((player) => (
          <li className="lobby-players-panel__item" key={player.id}>
            <LobbyPlayerCard player={player} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPlayersPanel;
