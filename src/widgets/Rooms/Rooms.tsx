import Button from "@/shared/ui/Button";
import "./Rooms.scss";
import { routes } from "@/shared/constants/routes";
import RoomsList from "@/entities/room/ui/RoomsList";
import { useRoomsQuery } from "@/entities/room/api/roomQueries";
import type { ReactNode } from "react";
import Spinner from "@/shared/ui/Spinner";

const Rooms = () => {
  const titleId = "rooms-page-title";

  const {
    data: roomsList,
    isPending,
    isError,
  } = useRoomsQuery({
    page: 1,
    pageSize: 6,
  });

  let roomsListContent: ReactNode = null;

  if (isPending) {
    roomsListContent = <Spinner size="large" />;
  } else if (isError) {
    roomsListContent = (
      <p className="rooms__notification">Ошибка при загрузки комнат...</p>
    );
  } else if (roomsList.items.length === 0) {
    roomsListContent = (
      <p className="rooms__notification">Игровых комнат пока что нету...</p>
    );
  } else {
    roomsListContent = <RoomsList rooms={roomsList.items} />;
  }

  return (
    <section className="rooms" aria-labelledby={titleId}>
      <div className="rooms__inner container">
        <header className="rooms__header">
          <div className="rooms__info">
            <h1 id={titleId} className="rooms__title">
              Игровые комнаты
            </h1>
            <p className="rooms__subtitle">
              Присоединяйся к открытой игре или создай свою
            </p>
          </div>
          <Button to={routes.createRoom}>Создать комнату</Button>
        </header>
        <div className="rooms__actions">поиск фильтрация</div>
        <div className="rooms__body">{roomsListContent}</div>
      </div>
    </section>
  );
};

export default Rooms;
