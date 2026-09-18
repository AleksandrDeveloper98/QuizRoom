import { HttpError } from "@/shared/api/httpError";

export const getJoinRoomErrorCode = (error: unknown): string | undefined => {
  if (!(error instanceof HttpError)) {
    return undefined;
  }

  if (typeof error.data !== "object" || error.data === null) {
    return undefined;
  }

  const code = (error.data as Record<string, unknown>).code;

  return typeof code === "string" ? code : undefined;
};
