import { roomAccessOptions } from "@/shared/config/quizOptions";

export const roomAccessFilterOptions = ["all", ...roomAccessOptions] as const;

export const roomAccessFilterLabels = {
  all: "Все",
  public: "Публичная",
  private: "Приватная",
} satisfies Record<(typeof roomAccessFilterOptions)[number], string>;
