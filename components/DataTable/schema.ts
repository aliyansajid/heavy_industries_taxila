import { z } from "zod";

export const lettersSchema = z.object({
  id: z.string(),
  subject: z.string(),
  reference: z.string(),
  priority: z.string(),
  date: z.date(),
});

export type Letters = z.infer<typeof lettersSchema>;
