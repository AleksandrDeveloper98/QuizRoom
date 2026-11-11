export const gameQueryKeys = {
  all: ["game"] as const,

  detail: (gameId: string) => [...gameQueryKeys.all, gameId] as const,
};
