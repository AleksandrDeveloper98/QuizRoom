import {
  difficultyOptionsLabels,
  roomAccessLabels,
  topicOptionsLabels,
} from "@/shared/config/quizOptions";
import "./LobbyParametersCard.scss";
import type { TLobbyParametersCardProps } from "./types";

const LobbyParametersCard = (props: TLobbyParametersCardProps) => {
  const { roomParams } = props;

  const params = [
    { label: "Тема", value: topicOptionsLabels[roomParams.topic] },
    { label: "Вопросов", value: roomParams.roundsCount },
    { label: "Время", value: `${roomParams.answerTimeSec} сек / вопрос` },
    {
      label: "Сложность",
      value: difficultyOptionsLabels[roomParams.difficulty],
    },
    { label: "Доступ", value: roomAccessLabels[roomParams.access] },
  ];

  return (
    <div className="lobby-parameters-card">
      <h2 className="lobby-parameters-card__title h4">Параметры</h2>
      <dl className="lobby-parameters-card__list">
        {params.map((param) => (
          <div className="lobby-parameters-card__item" key={param.label}>
            <dt>{param.label}</dt>
            <dd>{param.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default LobbyParametersCard;
