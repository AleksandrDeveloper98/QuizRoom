import type {
  gameDifficultyOptions,
  roomAccessOptions,
  topicOptions,
} from "@/shared/config/quizOptions";

export const maxPlayersOptions = [2, 3, 4] as const;

export const difficultyOptionsLabels = {
  easy: "Легко",
  medium: "Среднее",
  hard: "Сложно",
  mixed: "Смешанная",
} satisfies Record<(typeof gameDifficultyOptions)[number], string>;

export const accessRoomLabels = {
  public: "Публичная",
  private: "Приватная",
} satisfies Record<(typeof roomAccessOptions)[number], string>;

export const roomStatusOptions = ["playing", "waiting"] as const;

export const statusRoomLabels = {
  playing: "Идёт игра",
  waiting: "Ожидание",
} satisfies Record<(typeof roomStatusOptions)[number], string>;

export const topicOptionsLabels = {
  general: "Общие знания",
  history: "История",
  geography: "География",
  science: "Наука",
  cinema: "Кино",
  sport: "Спорт",
  it: "IT",
} satisfies Record<(typeof topicOptions)[number], string>;
