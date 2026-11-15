import { useParams } from "react-router-dom";
import QuestionCard from "@/widgets/Game/ui/QuestionCard";
import AnswerOptions from "@/widgets/Game/ui/AnswerOptions";
import GameLeaderboard from "@/widgets/Game/ui/GameLeaderboard";
import { useGameQuery } from "@/entities/game/api/gameQueries";
import "./Game.scss";


const Game = () => {
  const { gameId } = useParams();
  const game = useGameQuery(gameId ?? "");

  const leaderboardPlayers = [
    {
      playerId: "550e8400-e29b-41d4-a716-446655440000",
      name: "Анна",
      score: 120,
      hasAnswered: true,
    },
    {
      playerId: "550e8400-e29b-41d4-a716-446655440001",
      name: "Пётр",
      score: 95,
      hasAnswered: true,
    },
    {
      playerId: "550e8400-e29b-41d4-a716-446655440002",
      name: "Гость",
      score: 0,
      hasAnswered: false,
    },
    {
      playerId: "550e8400-e29b-41d4-a716-446655440003",
      name: "Мария",
      score: 85,
      hasAnswered: true,
    },
  ];

  return (
    <section className="game">
      <div className="game__inner container">
        <div className="game__body">
          <QuestionCard title="Столица России?" topic="sport" phaseEndsAt="" durationSeconds={15}/>
          <AnswerOptions options={["Москва", "Египет", "Казань", "Самара"]} />
        </div>
        <GameLeaderboard players={leaderboardPlayers} />
      </div>
    </section>
  );
};

export default Game;
