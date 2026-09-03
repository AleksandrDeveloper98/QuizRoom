import { zodResolver } from "@hookform/resolvers/zod";
import Field from "@/shared/ui/Field";
import "./GuestPlayerForm.scss";
import Button from "@/shared/ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type TCreateGuestPlayer,
  createGuestPlayerSchema,
} from "@/entities/guestPlayer/model/guestPlayerSchema";

import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/constants/routes";
import { useCreateGuestSessionMutation } from "@/features/guestSession/api/guestSessionMutation";

const GuestPlayerForm = () => {
  const createGuestSessionMutation = useCreateGuestSessionMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateGuestPlayer>({
    resolver: zodResolver(createGuestPlayerSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TCreateGuestPlayer> = (data) => {
    createGuestSessionMutation.mutate(data, {
      onSuccess: () => {
        navigate(routes.rooms);
      },
    });
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
