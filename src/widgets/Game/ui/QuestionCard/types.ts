import type { topicOptions } from "@/shared/config/quizOptions";

type TTopic = (typeof topicOptions)[number];

export type TQuestionCardProps = {
  topic: TTopic;
  title: string;
};
