import { Link } from "react-router-dom";
import { routes } from "@/shared/constants/routes";
import Icon from "@/shared/ui/Icon";
import LockIcon from "@/shared/assets/icons/lock.svg?react";
import Badge from "@/shared/ui/Badge";
import { roomDisplayStatusLabels } from "@/entities/room/model/constants";
import { roomCardStatus } from "./constants";
import type { TRoomCardProps } from "./types";
import "./RoomCard.scss";
import type { TRoomDisplayStatus } from "../../model/types";
import { difficultyOptionsLabels, topicOptionsLabels } from "@/shared/config/quizOptions/quizOptions";

const RoomCard = ({ room }: TRoomCardProps) => {
  const {
    id,
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
    <Link to={routes.roomById(id)} className="room-card">
      <header className="room-card__header">
        <div className="room-card__info">
          <p className="room-card__title">
            {name}
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
    </Link>
  );
};

export default RoomCard;
