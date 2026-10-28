import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRoomMutation } from "@/entities/room/api/roomMutations";
import {
  createRoomSchema,
  type TCreateRoom,
} from "@/entities/room/model/roomSchema";
import { routes } from "@/shared/constants/routes";
import BlockingLoader from "@/shared/ui/BlockingLoader";
import Field from "@/shared/ui/Field";
import OptionGroup from "@/shared/ui/OptionGroup";
import {
  answerTimeSecOptions,
  gameDifficultyOptions,
  roomAccessOptions,
  roundsCountOptions,
  topicOptions,
  maxPlayersOptions,
  roomAccessLabels,
  difficultyOptionsLabels,
  topicOptionsLabels,
} from "@/shared/config/quizOptions";
import Button from "@/shared/ui/Button";

import "./CreateRoomForm.scss";

const defaultValues: Partial<TCreateRoom> = {
  name: "",
  maxPlayers: 2,
  roundsCount: 15,
  answerTimeSec: 10,
  topic: "general",
  access: "public",
  difficulty: "mixed",
  password: "",
};

const CreateRoomForm = () => {
  const navigate = useNavigate();
  const createRoomMutation = useCreateRoomMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateRoom>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: defaultValues,
    shouldUnregister: true,
  });

  const accessWatch = useWatch({
    control,
    name: "access",
  });

  const onSubmitForm = (data: TCreateRoom) => {
    createRoomMutation.mutate(data, {
      onSuccess: (room) => {
        navigate(routes.roomById(room.id), { replace: true });
      },

      onError: () => {
        toast.error("Не удалось создать комнату");
      },
    });
  };

  return (
    <>
      <form
        className="create-room-form"
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
      >
        <fieldset
          className="create-room-form__section"
          disabled={createRoomMutation.isPending}
        >
          <legend className="create-room-form__title h4">
            Создай игру под свои предпочтения
          </legend>
          <Field
            id="name-room"
            label="Название комнаты"
            {...register("name")}
            error={errors.name?.message}
          />
          <Controller
            control={control}
            name="maxPlayers"
            render={({ field }) => (
              <OptionGroup
                name={field.name}
                title="Максимум игроков"
                options={maxPlayersOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="roundsCount"
            render={({ field }) => (
              <OptionGroup
                name={field.name}
                title="Количество вопросов"
                options={roundsCountOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="answerTimeSec"
            render={({ field }) => (
              <OptionGroup
                name={field.name}
                title="Время на ответ"
                options={answerTimeSecOptions}
                unit="сек"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="topic"
            render={({ field }) => (
              <OptionGroup
                name={field.name}
                title="Тема"
                options={topicOptions}
                getLabel={(topic) => topicOptionsLabels[topic]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="difficulty"
            render={({ field }) => (
              <OptionGroup
                name={field.name}
                title="Сложность"
                options={gameDifficultyOptions}
                getLabel={(difficulty) => difficultyOptionsLabels[difficulty]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="access"
            render={({ field }) => (
              <OptionGroup
                name={field.name}
                title="Доступ"
                options={roomAccessOptions}
                getLabel={(access) => roomAccessLabels[access]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {accessWatch === "private" && (
            <Field
              id="password-room"
              label="Пароль комнаты"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
          )}
        </fieldset>
        <div className="create-room-form__actions">
          <Button
            className="create-room-form__button"
            type="submit"
            disabled={createRoomMutation.isPending}
          >
            {createRoomMutation.isPending
              ? "Создаём комнату..."
              : "Создать комнату"}
          </Button>
        </div>
      </form>
      {createRoomMutation.isPending && <BlockingLoader />}
    </>
  );
};

export default CreateRoomForm;
