import z from "zod";
import { maxPlayersOptions } from "@/shared/config/quizOptions/quizOptions";

export const maxPlayersSchema = z.literal(maxPlayersOptions);
