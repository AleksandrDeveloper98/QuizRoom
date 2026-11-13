import QuestionCard from "@/widgets/Game/ui/QuestionCard";
import "./GamePage.scss";
import { useGameQuery } from "@/entities/game/api/gameQueries";
import { useParams } from "react-router-dom";
import AnswerOptions from "@/widgets/Game/ui/AnswerOptions";

const GamePage = () => {
  const { gameId } = useParams();
  const game = useGameQuery(gameId ?? "");
  return (
    <div>
      <QuestionCard title="Столица России?" topic="sport" />
      <AnswerOptions options={['Москва', 'Египет', 'Казань', 'Самара']}/>
    </div>
  );
};

export default GamePage;
