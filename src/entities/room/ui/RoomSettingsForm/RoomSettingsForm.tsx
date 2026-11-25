import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRoomSchema,
  getUpdateRoomSchema,
  type TCreateRoom,
} from "@/entities/room/model/roomSchema";
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

import type { TRoomSettingsFormProps } from "./types";
import "./RoomSettingsForm.scss";

const createDefaultValues: Partial<TCreateRoom> = {
  name: "",
  maxPlayers: 2,
  roundsCount: 10,
  answerTimeSec: 10,
  topic: "general",
  access: "public",
  difficulty: "mixed",
  password: "",
};

const RoomSettingsForm = (props: TRoomSettingsFormProps) => {
  const { mode, onSubmitForm, isPending } = props;

  const schema =
    mode === "edit" ? getUpdateRoomSchema(props.room.access) : createRoomSchema;

  const defaultValues =
    mode === "edit"
      ? {
          name: props.room.name,
          maxPlayers: props.room.maxPlayers,
          roundsCount: props.room.roundsCount,
          answerTimeSec: props.room.answerTimeSec,
          topic: props.room.topic,
          difficulty: props.room.difficulty,
          access: props.room.access,
          password: "",
        }
      : createDefaultValues;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateRoom>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    shouldUnregister: true,
  });

  const accessWatch = useWatch({
    control,
    name: "access",
  });

  const passwordLabel =
    mode === "edit" && props.room.access === "private"
      ? "Новый пароль (оставь пустым, чтобы сохранить старый)"
      : "Пароль комнаты";

  return (
    <>
      <form
        className="room-settings-form"
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
      >
        <fieldset className="room-settings-form__section" disabled={isPending}>
          <legend className="room-settings-form__title h4">
            {mode === "create"
              ? "Создай игру под свои предпочтения"
              : "Изменение настроек комнаты"}
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
              label={passwordLabel}
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
          )}
        </fieldset>
        <div className="room-settings-form__actions">
          <Button
            className="room-settings-form__button"
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Подождите..."
              : mode === "edit"
                ? "Сохранить изменения"
                : "Создать комнату"}
          </Button>
        </div>
      </form>
      {isPending && <BlockingLoader />}
    </>
  );
};

export default RoomSettingsForm;
