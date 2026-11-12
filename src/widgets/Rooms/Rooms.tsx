import { type ReactNode } from "react";
import clsx from "clsx";

import RoomsList from "@/widgets/Rooms/ui/RoomsList";
import { useJoinRoom } from "@/features/join-room/model/useJoinRoom";
import JoinPrivateRoomModal from "@/features/join-room/ui/JoinPrivateRoomModal";

import { useRoomsQuery } from "@/entities/room/api/roomQueries";
import { useRoomsRealtime } from "@/entities/room/api/roomRealtime";

import Pagination from "@/shared/ui/Pagination";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import Spinner from "@/shared/ui/Spinner";
import OptionGroup from "@/shared/ui/OptionGroup";
import { routes } from "@/shared/constants/routes";
import BlockingLoader from "@/shared/ui/BlockingLoader";

import {
  roomAccessFilterLabels,
  roomAccessFilterOptions,
} from "./model/constants";

import {
  useRoomsAccessFilter,
  useRoomsPagination,
  useRoomsSearch,
} from "./model/hooks";

import "./Rooms.scss";

const Rooms = () => {
  useRoomsRealtime();

  const { access, accessFilter, handleAccessChange } = useRoomsAccessFilter();
  const { search, debouncedSearch, handleSearchChange } = useRoomsSearch();
  const { page, handlePageChange } = useRoomsPagination();
  const {
    join,
    privateRoom,
    submitPassword,
    closePrivateRoomModal,
    pendingRoomId,
    isPendingJoinRoom,
    passwordError,
    clearPasswordError,
  } = useJoinRoom();

  const titleId = "rooms-page-title";

  const {
    data: roomsList,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
  } = useRoomsQuery({
    page,
    pageSize: 6,
    access,
    search: debouncedSearch || undefined,
  });

  let roomsListContent: ReactNode = null;
  const isUpdating = isFetching && isPlaceholderData;

  if (isPending) {
    roomsListContent = <Spinner size="large" />;
  } else if (isError) {
    roomsListContent = (
      <p className="rooms__notification">Ошибка при загрузке комнат...</p>
    );
  } else if (roomsList.items.length === 0 && debouncedSearch !== "") {
    roomsListContent = (
      <p className="rooms__notification">Комната не найдена...</p>
    );
  } else if (roomsList.items.length === 0) {
    roomsListContent = (
      <p className="rooms__notification">Игровых комнат пока нет...</p>
    );
  } else {
    roomsListContent = (
      <>
        <RoomsList
          rooms={roomsList.items}
          onJoin={join}
          pendingRoomId={pendingRoomId}
          isJoinPending={isPendingJoinRoom}
        />
        <Pagination
          page={roomsList.page}
          pageSize={roomsList.pageSize}
          total={roomsList.total}
          totalPages={roomsList.totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
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
        <div className="rooms__actions">
          <Field
            inputClassName="rooms__search-input"
            id="search-room"
            label="Поиск комнаты"
            type="search"
            hiddenLabel
            placeholder="Поиск комнаты..."
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          <OptionGroup
            name="access-filter"
            value={accessFilter}
            onChange={handleAccessChange}
            title="Фильтрация комнат"
            hiddenTitle
            options={roomAccessFilterOptions}
            getLabel={(access) => roomAccessFilterLabels[access]}
          />
        </div>
        <div
          className={clsx("rooms__body", isUpdating && "rooms__body--updating")}
          aria-busy={isUpdating}
        >
          {isUpdating && (
            <div className="rooms__updating">
              <Spinner size="large" />
            </div>
          )}
          {roomsListContent}
          {privateRoom && (
            <JoinPrivateRoomModal
              roomName={privateRoom.name}
              isPending={isPendingJoinRoom}
              onSubmit={submitPassword}
              onClose={closePrivateRoomModal}
              error={passwordError}
              onPasswordChange={clearPasswordError}
            />
          )}

          {isPendingJoinRoom && !privateRoom && <BlockingLoader />}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
