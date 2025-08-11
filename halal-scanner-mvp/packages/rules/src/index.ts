import fs from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ZodError } from 'zod';
import { ingredientArraySchema, enumberArraySchema, certifierSchema } from './schema';
import type { Ingredient, Enumber, Certifiers } from './types';

const dataDir = path.join(__dirname, '..', 'data');

async function readYamlFile<T>(fileName: string, schema: any): Promise<T[]> {
  const filePath = path.join(dataDir, fileName);
  const content = await fs.readFile(filePath, 'utf8');
  const parsed = parseYaml(content) as unknown;
  const result = schema.parse(parsed);
  return result as T[];
}

export async function loadIngredients(): Promise<Ingredient[]> {
  return readYamlFile<Ingredient>('ingredients.yaml', ingredientArraySchema);
}

export async function loadEnumbers(): Promise<Enumber[]> {
  return readYamlFile<Enumber>('enumbers.yaml', enumberArraySchema);
}

export async function loadCertifiers(): Promise<Certifiers> {
  const filePath = path.join(dataDir, 'certifiers.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const json = JSON.parse(raw);
  return certifierSchema.parse(json) as Certifiers;
}

export async function validateAll(): Promise<void> {
  // Attempt to load all data; will throw if invalid
  try {
    await Promise.all([loadIngredients(), loadEnumbers(), loadCertifiers()]);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(`Rule validation failed: ${err.toString()}`);
    }
    throw err;
  }
}

export { ingredientSchema, enumberSchema, ingredientArraySchema, enumberArraySchema, certifierSchema } from './schema';
export type { Ingredient, Enumber, Certifiers } from './types';