import RoomCard from "../RoomCard";

import "./RoomsList.scss";
import type { TRoomsListProps } from "./types";

const RoomsList = (props: TRoomsListProps) => {
  const { rooms } = props;

  return (
    <div className="rooms-list">
      <ul className="rooms-list__list">
        {rooms.map((room) => (
          <li className="rooms-list__item" key={room.id}>
            <RoomCard room={room} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
