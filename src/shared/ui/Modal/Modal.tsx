import type { TModalProps } from "./types";
import { Dialog } from "radix-ui";

import "./Modal.scss";

const Modal = (props: TModalProps) => {
  const { open, title, children, actions, onClose } = props;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal" />
        <Dialog.Content className="modal__dialog" aria-describedby={undefined}>
          <Dialog.Title className="modal__title h4">{title}</Dialog.Title>
          {children && <div className="modal__main">{children}</div>}
          {actions && <div className="modal__actions">{actions}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
