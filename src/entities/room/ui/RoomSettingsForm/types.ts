import type { TCreateRoom } from "../../model/roomSchema";
import type { TRoomDetails } from "../../model/roomDetailsSchema";

export type TRoomSettingsFormProps = {
  isPending: boolean;
  onSubmitForm: (data: TCreateRoom) => void;
} & (
  | {
      mode: "create";
      room?: never;
    }
  | {
      mode: "edit";
      room: TRoomDetails;
    }
);
