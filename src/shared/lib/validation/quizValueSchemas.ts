import z from "zod";
import {
  answerTimeSecOptions,
  roundsCountOptions,
} from "@/shared/config/quizOptions";

export const roundsCountSchema = z.literal(roundsCountOptions);

export const answerTimeSecSchema = z.literal(answerTimeSecOptions);
