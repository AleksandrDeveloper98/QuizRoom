import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGuestSessionMutation } from "@/features/guest-session/api/guestSessionMutation";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import {
  type TCreateGuestPlayer,
  createGuestPlayerSchema,
} from "@/entities/guestPlayer/model/guestPlayerSchema";

import "./GuestPlayerForm.scss";

const GuestPlayerForm = () => {
  const createGuestSessionMutation = useCreateGuestSessionMutation();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateGuestPlayer>({
    resolver: zodResolver(createGuestPlayerSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TCreateGuestPlayer> = (data) => {
    createGuestSessionMutation.mutate(data);
  };

  return (
    <form
      className="guest-player-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset
        className="guest-player-form__section"
        disabled={createGuestSessionMutation.isPending}
      >
        <legend className="visually-hidden">Вход в QuizRoom</legend>
        <Field
          inputClassName="guest-player-form__field"
          id="name"
          label="Ваше имя"
          placeholder="Например, Алексей"
          autoComplete="off"
          {...register("name", {
            onChange: () => {
              if (createGuestSessionMutation.isError) {
                createGuestSessionMutation.reset();
              }
            },
          })}
          error={errors.name?.message}
        />
        <Button className="guest-player-form__button" type="submit">
          {createGuestSessionMutation.isPending
            ? "Подождите..."
            : "Начать играть"}
        </Button>
      </fieldset>

      <p className="guest-player-form__error" role="alert">
        {createGuestSessionMutation.isError
          ? "Не удалось войти. Попробуйте ещё раз."
          : ""}
      </p>
    </form>
  );
};

export default GuestPlayerForm;
