import type {
  gameDifficultyOptions,
  roomAccessOptions,
  topicOptions,  
} from "@/shared/config/quizOptions";
import type { TRoomDisplayStatus } from "./types";

export const difficultyOptionsLabels = {
  easy: "Легко",
  medium: "Средне",
  hard: "Сложно",
  mixed: "Смешанная",
} satisfies Record<(typeof gameDifficultyOptions)[number], string>;

export const accessRoomLabels = {
  public: "Публичная",
  private: "Приватная",
} satisfies Record<(typeof roomAccessOptions)[number], string>;

export const roomDisplayStatusLabels = {
  playing: "Идёт игра",
  waiting: "Ожидание",
  filled: "Заполнено",
} satisfies Record<TRoomDisplayStatus, string>;

export const topicOptionsLabels = {
  general: "Общие знания",
  history: "История",
  geography: "География",
  science: "Наука",
  cinema: "Кино",
  sport: "Спорт",
  it: "IT",
} satisfies Record<(typeof topicOptions)[number], string>;
