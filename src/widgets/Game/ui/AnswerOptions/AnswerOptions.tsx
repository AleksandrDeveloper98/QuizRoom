import clsx from "clsx";
import type { TAnswerOptionsProps } from "./types";
import "./AnswerOptions.scss";

const ANSWER_LETTERS = ["A", "B", "C", "D"];

const AnswerOptions = (props: TAnswerOptionsProps) => {
  const {
    options,
    selectedAnswerIndex,
    correctAnswerIndex,
    disabled = false,
    onAnswerSelect,
  } = props;

  const isReadOnly =
    disabled ||
    selectedAnswerIndex !== null ||
    correctAnswerIndex !== undefined ||
    !onAnswerSelect;

  return (
    <div className="answer-options">
      <ul className="answer-options__list">
        {options.map((option, index) => {
          const isSelected = selectedAnswerIndex === index;
          const isCorrect = correctAnswerIndex === index;

          const isIncorrect =
            correctAnswerIndex !== undefined && isSelected && !isCorrect;

          return (
            <li className="answer-options__item" key={index}>
              <button
                onClick={() => onAnswerSelect?.(index)}
                disabled={isReadOnly}
                type="button"
                className={clsx("answer-options__button", {
                  "answer-options__button--selected-answer": isSelected,
                  "answer-options__button--correct-answer": isCorrect,
                  "answer-options__button--incorrect-answer": isIncorrect,
                })}
              >
                <span className="answer-options__letter">
                  {ANSWER_LETTERS[index]}
                </span>
                <span className="answer-options__option">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AnswerOptions;
