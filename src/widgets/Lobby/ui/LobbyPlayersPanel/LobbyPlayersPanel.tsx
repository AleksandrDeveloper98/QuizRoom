import LobbyPlayerCard from "@/widgets/Lobby/ui/LobbyPlayerCard";
import type { TLobbyPlayersPanelProps } from "./types";
import Badge from "@/shared/ui/Badge";
import ReadyButton from "@/features/room-ready/ui/ReadyButton";

import "./LobbyPlayersPanel.scss";

const LobbyPlayersPanel = (props: TLobbyPlayersPanelProps) => {
  const { players, currentPlayer } = props;

  const onlyRolePlayers = players.filter((player) => player.role === "player");

  const readyPlayersCount = onlyRolePlayers.filter(
    (player) => player.isReady,
  ).length;

  return (
    <div className="lobby-players-panel">
      <div className="lobby-players-panel__header">
        <h2 className="lobby-players-panel__title h4">Игроки</h2>
        <Badge
          variant="green"
          children={`${readyPlayersCount} из ${onlyRolePlayers.length} готовы`}
        />
      </div>
      <ul className="lobby-players-panel__list">
        {players.map((player) => (
          <li className="lobby-players-panel__item" key={player.id}>
            <LobbyPlayerCard player={player} />
          </li>
        ))}
      </ul>

      {currentPlayer.role === "player" && (
        <ReadyButton isReady={currentPlayer.isReady} />
      )}
    </div>
  );
};

export default LobbyPlayersPanel;
