import { HttpError } from "./httpError";

export const httpClient = async (
  url: string,
  options: RequestInit = {},
): Promise<unknown> => {
  const hasBody = options.body !== undefined;

  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const isNoContent = response.status === 204;

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data = isNoContent || !isJson ? null : await response.json();

  if (!response.ok) {
    throw new HttpError(response.status, data);
  }

  return data;
};
