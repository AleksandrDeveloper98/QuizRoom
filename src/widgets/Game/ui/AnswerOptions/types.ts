export type TAnswerOptionsProps = {
  options: string[];
  selectedAnswerIndex: number | null;
  correctAnswerIndex?: number;
  disabled?: boolean;
  onAnswerSelect?: (selectedAnswerIndex: number) => void;
};
