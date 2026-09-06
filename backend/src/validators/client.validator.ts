import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .pipe(z.email("Please provide a valid email address"))
    .transform((value) => value.toLowerCase()),

  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
});

export const updateClientSchema = clientSchema.partial();

export type ClientInput = z.infer<typeof clientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;