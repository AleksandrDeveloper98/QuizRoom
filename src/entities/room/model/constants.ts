import type { TRoomDisplayStatus } from "./types";

export const roomDisplayStatusLabels = {
  playing: "Идёт игра",
  waiting: "Ожидание",
  filled: "Заполнено",
} satisfies Record<TRoomDisplayStatus, string>;
