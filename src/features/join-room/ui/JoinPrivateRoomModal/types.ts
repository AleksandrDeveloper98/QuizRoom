export type TJoinPrivateRoomModalProps = {
  roomName: string;
  onClose: () => void;
  onSubmit: (password: string) => void;
  isPending: boolean;
  error?: string;
};
