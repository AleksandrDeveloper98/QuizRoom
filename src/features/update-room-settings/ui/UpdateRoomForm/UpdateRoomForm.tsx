import type { TUpdateRoom } from "@/entities/room/model/roomSchema";
import RoomSettingsForm from "@/entities/room/ui/RoomSettingsForm";
import { useUpdateRoom } from "../../model/useUpdateRoom";
import type { TUpdateRoomFormProps } from "./types";

const UpdateRoomForm = (props: TUpdateRoomFormProps) => {
  const { room } = props;
  const { handleUpdateRoom, isPending } = useUpdateRoom();

  const handleSubmit = (data: TUpdateRoom) => {
    const { password, ...settings } = data;

    handleUpdateRoom({
      roomId: room.id,
      payload: {
        ...settings,
        ...(data.access === "private" && password ? { password } : {}),
      },
    });
  };

  return (
    <RoomSettingsForm
      mode="edit"
      room={room}
      isPending={isPending}
      onSubmitForm={handleSubmit}
    />
  );
};

export default UpdateRoomForm;
