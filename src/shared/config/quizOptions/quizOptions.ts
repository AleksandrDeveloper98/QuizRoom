export const maxPlayersOptions = [2, 3, 4] as const;

export const roundsCountOptions = [5, 10, 15] as const;

export const answerTimeSecOptions = [10, 15, 20] as const;

export const questionDifficultyOptions = ["easy", "medium", "hard"] as const;

export const gameDifficultyOptions = [
  ...questionDifficultyOptions,
  "mixed",
] as const;

export const roomAccessOptions = ["public", "private"] as const;

export const roomStatusOptions = ["playing", "waiting"] as const;

export const topicOptions = [
  "general",
  "history",
  "geography",
  "science",
  "cinema",
  "sport",
  "it",
] as const;

export const gameStatusOptions = {
  playing: "playing",
  finished: "finished",
} as const; // для бэка тк у игры мб два состояния
