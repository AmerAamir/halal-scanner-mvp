import { loadIngredients, loadEnumbers } from '@halalscanner/rules';
import type { Ingredient, Enumber, Status } from '@halalscanner/rules/dist/types';
import { distance as levenshteinDistance } from 'fastest-levenshtein';

export interface Explanation {
  /** Canonical name or code that matched */
  match: string;
  /** Status of the ingredient */
  status: Status;
  /** Note explaining the status */
  note: string;
  /** Citations for this verdict */
  citations: string[];
}

export interface EvaluatedIngredient {
  /** Original token from user input */
  token: string;
  /** Canonical match from rules */
  match: string;
  /** Status verdict */
  status: Status;
  /** Explanation object */
  explanation: Explanation;
}

/**
 * Remove punctuation, parentheses and extra whitespace, convert to lower case and split
 * by commas, semicolons or slashes.
 */
export function tokenize(input: string): string[] {
  // Normalize Unicode and remove diacritics
  const normalised = input.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  return normalised
    .toLowerCase()
    .replace(/\([^)]*\)/g, '') // remove parenthetical remarks
    .split(/[;,/]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// internal caches
let ingredientList: Ingredient[] | null = null;
let enumberList: Enumber[] | null = null;

/**
 * Lazy load rules into memory.  Called internally before evaluation.
 */
async function ensureRulesLoaded() {
  if (!ingredientList || !enumberList) {
    [ingredientList, enumberList] = await Promise.all([loadIngredients(), loadEnumbers()]);
  }
}

/** Find the best matching ingredient by exact or fuzzy matching. */
function matchIngredient(token: string): Ingredient | null {
  if (!ingredientList) return null;
  // first try exact match on name or synonyms
  for (const ing of ingredientList) {
    if (ing.name === token || ing.synonyms.includes(token)) {
      return ing;
    }
  }
  // fuzzy match based on Levenshtein distance to names and synonyms
  let best: { item: Ingredient | null; distance: number } = { item: null, distance: Infinity };
  for (const ing of ingredientList) {
    const names = [ing.name, ...ing.synonyms];
    for (const name of names) {
      const d = levenshteinDistance(token, name);
      if (d < best.distance && d <= 2) {
        best = { item: ing, distance: d };
      }
    }
  }
  return best.item;
}

/** Find a matching E‑number by code (case insensitive). */
function matchEnumber(token: string): Enumber | null {
  if (!enumberList) return null;
  const normalised = token.toUpperCase().replace(/\s+/g, '');
  for (const e of enumberList) {
    if (e.code.toUpperCase() === normalised || e.code.toUpperCase() === 'E' + normalised.replace(/^E/i, '')) {
      return e;
    }
  }
  return null;
}

/**
 * Evaluate a list of ingredient tokens and return verdicts.
 */
export async function evaluate(tokens: string[]): Promise<EvaluatedIngredient[]> {
  await ensureRulesLoaded();
  return tokens.map((token) => {
    const trimmed = token.trim();
    // try matching ingredient rules
    const ing = matchIngredient(trimmed);
    if (ing) {
      return {
        token: trimmed,
        match: ing.name,
        status: ing.status,
        explanation: {
          match: ing.name,
          status: ing.status,
          note: ing.note,
          citations: ing.citations
        }
      } as EvaluatedIngredient;
    }
    // try matching E‑number
    const en = matchEnumber(trimmed);
    if (en) {
      return {
        token: trimmed,
        match: en.code,
        status: en.status,
        explanation: {
          match: en.code,
          status: en.status,
          note: en.note,
          citations: en.citations
        }
      } as EvaluatedIngredient;
    }
    // unknown token defaults to doubtful
    return {
      token: trimmed,
      match: trimmed,
      status: 'doubtful' as Status,
      explanation: {
        match: trimmed,
        status: 'doubtful' as Status,
        note: 'Ingredient not found in rules database. Treat as doubtful and check packaging.',
        citations: []
      }
    } as EvaluatedIngredient;
  });
}

/**
 * Convenience function to parse an ingredient string and evaluate it using the rule engine.
 */
export async function evaluateFromString(input: string): Promise<EvaluatedIngredient[]> {
  const tokens = tokenize(input);
  return evaluate(tokens);
}