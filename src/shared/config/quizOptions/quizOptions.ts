export const maxPlayersOptions = [2, 3, 4] as const;

export const roundsCountOptions = [5, 10, 15] as const;

export const answerTimeSecOptions = [10, 15, 20] as const;

export const questionDifficultyOptions = ["easy", "medium", "hard"] as const;

export const gameDifficultyOptions = [
  ...questionDifficultyOptions,
  "mixed",
] as const;

export const difficultyOptionsLabels = {
  easy: "Легко",
  medium: "Средне",
  hard: "Сложно",
  mixed: "Смешанная",
} satisfies Record<(typeof gameDifficultyOptions)[number], string>;

export const roomAccessOptions = ["public", "private"] as const;

export const accessRoomLabels = {
  public: "Публичная",
  private: "Приватная",
} satisfies Record<(typeof roomAccessOptions)[number], string>;

export const roomStatusOptions = ["playing", "waiting"] as const;

export const topicOptions = [
  "it",
  "history",
  "geography",
  "science",
  "cinema",
  "sport",
  "general",
] as const;

export const topicOptionsLabels = {
  it: "IT",
  history: "История",
  geography: "География",
  science: "Наука",
  cinema: "Кино",
  sport: "Спорт",
  general: "Общие знания",
} satisfies Record<(typeof topicOptions)[number], string>;

export const gameStatusOptions = {
  playing: "playing",
  finished: "finished",
} as const; // для бэка тк у игры мб два состояния
