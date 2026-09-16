import { createPortal } from "react-dom";
import "./Modal.scss";
import type { TModalProps } from "./types";
import { useEffect, useId, type MouseEvent } from "react";

const Modal = (props: TModalProps) => {
  const { title, children, actions, onClose } = props;

  const id = useId();
  const titleId = `${title}${id}`;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal" onMouseDown={handleBackdropClick}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 className="modal__title h4" id={titleId}>
          {title}
        </h2>
        {children && <div className="modal__main">{children}</div>}
        {actions && <div className="modal__actions">{actions}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
