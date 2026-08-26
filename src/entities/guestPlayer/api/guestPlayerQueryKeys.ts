export const guestPlayerQueryKeys = {
  all: ["guest-player"] as const,

  current: () => [...guestPlayerQueryKeys.all, "current"] as const,
};
