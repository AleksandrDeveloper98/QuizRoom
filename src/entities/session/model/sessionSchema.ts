import z from "zod";

export const sessionSchema = z.object({
  id: z.string(),

  playerId: z.string(),

  createdAt: z.iso.datetime(),

  lastSeenAt: z.iso.datetime(),

  expiresAt: z.iso.datetime(),
});

export type TSession = z.infer<typeof sessionSchema>;
