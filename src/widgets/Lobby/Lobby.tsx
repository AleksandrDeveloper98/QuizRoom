import toast from "react-hot-toast";
import LobbyPlayersPanel from "@/widgets/Lobby/ui/LobbyPlayersPanel";
import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";
import type { TLobbyProps } from "./types";
import LobbyParametersCard from "./ui/LobbyParametersCard";

import "./Lobby.scss";

const Lobby = (props: TLobbyProps) => {
  const { room, roomId, currentPlayer } = props;

  const handleCopyRoomLink = async () => {
    try {
      const roomLink = new URL(
        routes.inviteById(roomId),
        window.location.origin,
      ).toString();

      await navigator.clipboard.writeText(roomLink);

      toast.success("Ссылка скопирована");
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  return (
    <section className="lobby">
      <div className="lobby__inner container">
        <h1 className="lobby__title">{room.name}</h1>
        <div className="lobby__body">
          <LobbyPlayersPanel
            players={room.players}
            currentPlayer={currentPlayer}
          />
          <div className="lobby__sidebar">
            <LobbyParametersCard roomParams={room} />
            <Button onClick={handleCopyRoomLink}>Скопировать ссылку</Button>
            {currentPlayer.role === "host" && (
              <Button to={routes.updateRoomById(roomId)}>
                Изменить настройки комнаты
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lobby;
