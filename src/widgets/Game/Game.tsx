import QuestionCard from "@/widgets/Game/ui/QuestionCard";
import AnswerOptions from "@/widgets/Game/ui/AnswerOptions";
import GameLeaderboard from "@/widgets/Game/ui/GameLeaderboard";
import { useSubmitAnswer } from "@/features/submit-answer";
import type { TGameProps } from "./types";
import GameResults from "./ui/GameResults";
import "./Game.scss";

const REVEAL_DURATION_SECONDS = 3;

const Game = (props: TGameProps) => {
  const { game } = props;
  const { submitAnswer, isSubmitting } = useSubmitAnswer(game.id);

  if (game.status === "finished") {
    return (
      <GameResults
        players={game.players}
        roomId={game.roomId}
        totalQuestions={game.roundsCount}
        currentPlayerId={game.me.playerId}
      />
    );
  }

  const isAnswering = game.phase === "answering";

  const handleAnswerSelect = (selectedAnswerIndex: number) => {
    if (!isAnswering || game.me.selectedAnswerIndex !== null || isSubmitting) {
      return;
    }

    submitAnswer({
      questionId: game.currentQuestion.id,
      selectedAnswerIndex,
    });
  };

  return (
    <section className="game">
      <div className="game__inner container">
        <div className="game__body">
          <span>
            Текущий раунд: {game.currentRound} / {game.roundsCount}
          </span>
          <QuestionCard
            question={game.currentQuestion.question}
            topic={game.currentQuestion.topic}
            phaseEndsAt={game.phaseEndsAt}
            durationSeconds={
              isAnswering ? game.answerTimeSec : REVEAL_DURATION_SECONDS
            }
          />
          {!isAnswering && (
            <p className="game__phase-hint">
              {game.currentRound === game.roundsCount
                ? "Скоро подведём итоги игры"
                : "Следующий вопрос скоро начнётся"}
            </p>
          )}
          <AnswerOptions
            options={game.currentQuestion.answerOptions}
            onAnswerSelect={isAnswering ? handleAnswerSelect : undefined}
            selectedAnswerIndex={game.me.selectedAnswerIndex}
            correctAnswerIndex={
              game.phase === "reveal"
                ? game.currentQuestion.correctAnswerIndex
                : undefined
            }
            disabled={isSubmitting || !isAnswering}
          />
        </div>
        <GameLeaderboard players={game.players} />
      </div>
    </section>
  );
};

export default Game;
