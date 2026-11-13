import type { TAnswerOptionsProps } from "./types";
import "./AnswerOptions.scss";

const AnswerOptions = (props: TAnswerOptionsProps) => {
  const { options } = props;

  const ANSWER_LETTER = ["A", "B", "C", "D"];

  return (
    <div className="answer-options">
      <ul className="answer-options__list">
        {options.map((option, index) => (
          <li className="answer-options__item">
            <button className="answer-options__button">
              <span className="answer-options__letter">
                {ANSWER_LETTER[index]}
              </span>
              <span className="answer-options__option">{option}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerOptions;
