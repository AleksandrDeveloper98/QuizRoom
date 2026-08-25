import type {
  difficultyOptions,
  topicOptions,
} from "@/shared/config/quizOptions";

export const maxPlayersOptions = [2, 3, 4] as const;

export const roundsCountOptions = [5, 10, 15] as const;

export const answerTimeSecOptions = [10, 15, 20] as const;

export const difficultyOptionsLabels = {
  easy: "Легко",
  medium: "Среднее",
  hard: "Сложно",
  mixed: "Смешанная",
} satisfies Record<(typeof difficultyOptions)[number], string>;

export const accessRoomArr = ["public", "private"] as const;

export const accessRoomLabels = {
  public: "Публичная",
  private: "Приватная",
} satisfies Record<(typeof accessRoomArr)[number], string>;

export const statusRoomArr = ["playing", "waiting"] as const;

export const statusRoomLabels = {
  playing: "Идёт игра",
  waiting: "Ожидание",
} satisfies Record<(typeof statusRoomArr)[number], string>;

export const topicOptionsLabels = {
  general: "Общие знания",
  history: "История",
  geography: "География",
  science: "Наука",
  cinema: "Кино",
  sport: "Спорт",
  it: "IT",
} satisfies Record<(typeof topicOptions)[number], string>;
