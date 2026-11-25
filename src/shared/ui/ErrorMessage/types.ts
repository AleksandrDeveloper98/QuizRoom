export type TErrorMessageProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  backTo?: string;
  backLabel?: string;
  replace?: boolean;
};
