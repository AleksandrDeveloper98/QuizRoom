import RoomSettingsForm from "@/entities/room/ui/RoomSettingsForm";
import { useCreateRoomForm } from "../../model/useCreateRoomForm";

const CreateRoomForm = () => {
  const { isPending, handleSubmitForm } = useCreateRoomForm();

  return (
    <RoomSettingsForm
      mode="create"
      isPending={isPending}
      onSubmitForm={handleSubmitForm}
    />
  );
};

export default CreateRoomForm;
