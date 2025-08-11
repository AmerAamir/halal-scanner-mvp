import { z } from 'zod';

export const statusSchema = z.enum(['halal', 'haram', 'doubtful']);

export const ingredientSchema = z.object({
  name: z.string().min(1),
  synonyms: z.array(z.string()),
  status: statusSchema,
  note: z.string(),
  citations: z.array(z.string().url()).min(1)
});

export const enumberSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  status: statusSchema,
  note: z.string(),
  citations: z.array(z.string().url()).min(1)
});

export const ingredientArraySchema = z.array(ingredientSchema);
export const enumberArraySchema = z.array(enumberSchema);

export const certifierSchema = z.record(z.string().url());