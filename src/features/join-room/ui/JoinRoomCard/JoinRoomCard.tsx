import RoomCard from "@/entities/room/ui/RoomCard";
import Spinner from "@/shared/ui/Spinner";
import type { TJoinRoomCardProps } from "./types";

import "./JoinRoomCard.scss";

const JoinRoomCard = (props: TJoinRoomCardProps) => {
  const { room, onJoin, isPending, isJoinDisabled } = props;

  const isUnavailable =
    room.status === "playing" || room.playersCount >= room.maxPlayers;

  return (
    <>
      <div className="join-room-card">
        <RoomCard room={room} className="join-room-card__card" />
        <button
          className="join-room-card__trigger"
          disabled={isUnavailable || isJoinDisabled}
          aria-label={`Войти в комнату ${room.name}`}
          onClick={onJoin}
          aria-busy={isPending}
        >
          {isPending && (
            <span className="join-room-card__loader">
              <Spinner size="small" />
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default JoinRoomCard;
