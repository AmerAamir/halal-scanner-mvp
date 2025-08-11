export type Status = 'halal' | 'haram' | 'doubtful';

/**
 * Canonical ingredient entry.
 */
export interface Ingredient {
  /** Canonical lowercase name (language‑agnostic) */
  name: string;
  /** Alternative names/spellings */
  synonyms: string[];
  /** HALAL / HARAM / DOUBTFUL */
  status: Status;
  /** Short human‑readable explanation */
  note: string;
  /** Citation URLs for this verdict */
  citations: string[];
}

export interface Enumber {
  /** E‑code (e.g. E471) */
  code: string;
  /** Common name */
  name: string;
  /** HALAL / HARAM / DOUBTFUL */
  status: Status;
  /** Short explanation */
  note: string;
  /** Citation URLs */
  citations: string[];
}

export interface Certifiers {
  [name: string]: string;
}