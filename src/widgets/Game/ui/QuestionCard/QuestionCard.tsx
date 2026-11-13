import type { TQuestionCardProps } from "./types";
import "./QuestionCard.scss";
import { topicOptionsLabels } from "@/shared/config/quizOptions";

const QuestionCard = (props: TQuestionCardProps) => {
  const { title, topic } = props;
  return (
    <div className="question-card">
      {/* Таймер */}
      <div className="question-card__info">
        <p className="question-card__topic">{topicOptionsLabels[topic]}</p>
        <h2 className="h3 question-card__title">{title}</h2>
      </div>
    </div>
  );
};

export default QuestionCard;
