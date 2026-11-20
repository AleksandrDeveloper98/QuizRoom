import type { TResultPlayer } from "@/entities/game/model/gameStateSchema";

export type TGameResultsProps = {
  players: TResultPlayer[];
  totalQuestions: number;
  roomId: string;
  currentPlayerId: string;
};
