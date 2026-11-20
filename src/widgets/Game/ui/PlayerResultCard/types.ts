import type { TResultPlayer } from "@/entities/game/model/gameStateSchema";

export type TPlayerResultCardProps = {
  player: TResultPlayer;
  totalQuestions: number;
  currentPlayerId: string;
};
