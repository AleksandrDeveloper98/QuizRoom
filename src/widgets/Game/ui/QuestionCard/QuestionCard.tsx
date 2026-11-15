import { topicOptionsLabels } from "@/shared/config/quizOptions";
import Timer from "@/shared/ui/Timer";
import type { TQuestionCardProps } from "./types";
import "./QuestionCard.scss";

const QuestionCard = (props: TQuestionCardProps) => {
  const { title, topic, phaseEndsAt, durationSeconds } = props;
  return (
    <div className="question-card">
      <Timer phaseEndsAt={phaseEndsAt} durationSeconds={durationSeconds} />
      <div className="question-card__info">
        <p className="question-card__topic">{topicOptionsLabels[topic]}</p>
        <h2 className="h3 question-card__title">{title}</h2>
      </div>
    </div>
  );
};

export default QuestionCard;
