import type { TOptionGroupProps } from "./types";
import "./OptionGroup.scss";
import clsx from "clsx";

const OptionGroup = <T extends string | number>(
  props: TOptionGroupProps<T>,
) => {
  const {
    name,
    onChange,
    value,
    options,
    title,
    hiddenTitle,
    getLabel = (option) => String(option),
    unit,
  } = props;

  return (
    <fieldset className="option-group">
      <legend
        className={clsx(
          "option-group__title h5",
          hiddenTitle && "visually-hidden",
        )}
      >
        {title}
      </legend>
      <ul className="option-group__list">
        {options.map((option) => {
          const id = `${title}-${option}`;
          return (
            <li className="option-group__item" key={option}>
              <input
                className="option-group__input visually-hidden"
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              <label className="option-group__option" htmlFor={id}>
                {getLabel(option)} {unit && `${unit}`}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

export default OptionGroup;
