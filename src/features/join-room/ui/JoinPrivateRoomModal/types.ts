export type TJoinPrivateRoomModalProps = {
  roomName?: string;
  onClose: () => void;
  onSubmit: (password: string) => void;
  onPasswordChange: () => void;
  isPending: boolean;
  error?: string;
};
