import JoinRoomCard from "@/features/join-room/ui/JoinRoomCard";
import type { TRoomsListProps } from "./types";

import "./RoomsList.scss";

const RoomsList = (props: TRoomsListProps) => {
  const { rooms, pendingRoomId, isJoinPending, onJoin } = props;

  return (
    <div className="rooms-list">
      <ul className="rooms-list__list">
        {rooms.map((room) => (
          <li className="rooms-list__item" key={room.id}>
            <JoinRoomCard
              room={room}
              isJoinDisabled={isJoinPending}
              isPending={pendingRoomId === room.id}
              onJoin={() => onJoin(room)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
