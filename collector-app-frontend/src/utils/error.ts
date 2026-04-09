type ApiError = { response?: { data?: { message?: string } } };

/** Extracts a human-readable message from an Axios error or falls back to a default. */
export const getErrorMessage = (
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string =>
  (err as ApiError)?.response?.data?.message ?? fallback;
