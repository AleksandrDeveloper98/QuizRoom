import z from "zod";

export const roomPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, "Поле не может быть пустым")
    .max(10, "Максимум 10 символов"),
});

export type TRoomPassword = z.infer<typeof roomPasswordSchema>;
