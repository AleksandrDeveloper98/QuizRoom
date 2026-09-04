import z from "zod";

export const createGuestPlayerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Поле не может быть пустым")
    .max(15, "Максимум 15 символов"),
});

export const guestPlayerSchema = createGuestPlayerSchema.extend({
  id: z.uuid(),
});

export type TGuestPlayer = z.infer<typeof guestPlayerSchema>;
export type TCreateGuestPlayer = z.infer<typeof createGuestPlayerSchema>;
