import z from "zod";

import { maxPlayersOptions } from "./constants";

export const maxPlayersSchema = z.literal(maxPlayersOptions);


