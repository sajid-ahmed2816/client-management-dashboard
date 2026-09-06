import { z } from "zod";

export const formatZodError = (
  error: z.ZodError
): Record<string, string[]> => {
  return z.flattenError(error).fieldErrors;
};