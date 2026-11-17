export type TSubmitAnswerPayload = {
  questionId: string;
  selectedAnswerIndex: number;
};

export type TSubmitAnswerVariables = {
  gameId: string;
  payload: TSubmitAnswerPayload;
};
