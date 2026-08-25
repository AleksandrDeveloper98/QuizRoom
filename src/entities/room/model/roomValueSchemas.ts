import z from "zod";

import {
  answerTimeSecOptions,
  maxPlayersOptions,
  roundsCountOptions,
} from "./constants";

export const maxPlayersSchema = z.literal(maxPlayersOptions);

export const roundsCountSchema = z.literal(roundsCountOptions);

export const answerTimeSecSchema = z.literal(answerTimeSecOptions);
