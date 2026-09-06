import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters"),

  description: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(["pending", "in-progress", "completed"])
    .default("pending"),

  clientId: z
    .string()
    .trim()
    .min(1, "Client is required"),
});

export const updateProjectSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

export const projectQuerySchema = z.object({
  search: z.string().trim().optional(),

  status: z
    .enum(["pending", "in-progress", "completed"])
    .optional(),
});

export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;