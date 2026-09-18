import clsx from "clsx";
import { roomDisplayStatusLabels } from "@/entities/room/model/constants";
import Icon from "@/shared/ui/Icon";
import LockIcon from "@/shared/assets/icons/lock.svg?react";
import Badge from "@/shared/ui/Badge";
import {
  difficultyOptionsLabels,
  topicOptionsLabels,
} from "@/shared/config/quizOptions/quizOptions";
import { roomCardStatus } from "./constants";
import type { TRoomCardProps } from "./types";
import type { TRoomDisplayStatus } from "../../model/types";

import "./RoomCard.scss";

const RoomCard = ({ room, className }: TRoomCardProps) => {
  const {
    name,
    topic,
    status,
    roundsCount,
    answerTimeSec,
    difficulty,
    maxPlayers,
    playersCount,
    access,
  } = room;

  const isAccessPrivate = access === "private";
  const displayStatus: TRoomDisplayStatus =
    status === "waiting" && playersCount >= maxPlayers ? "filled" : status;

  return (
    <article className={clsx("room-card", className)}>
      <header className="room-card__header">
        <div className="room-card__info">
          <p className="room-card__title">
            <span className="room-card__title">{name}</span>
            {isAccessPrivate && (
              <>
                <Icon icon={LockIcon} />
                <span className="visually-hidden">Приватная комната</span>
              </>
            )}
          </p>
          <p className="room-card__subtitle">{topicOptionsLabels[topic]}</p>
        </div>
        <div className="room-card__status">
          <Badge variant={roomCardStatus[displayStatus]}>
            {roomDisplayStatusLabels[displayStatus]}
          </Badge>
        </div>
      </header>

      <div className="room-card__body">
        <div className="room-card__description">
          <span>{roundsCount} вопросов</span>
          <span>{answerTimeSec} сек/вопрос</span>
          <span>{difficultyOptionsLabels[difficulty]}</span>
        </div>
        <div className="room-card__extra">
          <span>
            Игроков {playersCount}/{maxPlayers}
          </span>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
