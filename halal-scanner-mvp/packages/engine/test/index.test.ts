import { describe, it, expect } from 'vitest';
import { tokenize, evaluateFromString } from '../src/index';

describe('tokenize', () => {
  it('splits by commas and removes parentheses', () => {
    const input = 'Sugar (brown), gelatin; water / salt';
    const tokens = tokenize(input);
    expect(tokens).toEqual(['sugar', 'gelatin', 'water', 'salt']);
  });
});

describe('evaluateFromString', () => {
  it('classifies known ingredients and unknown as doubtful', async () => {
    const result = await evaluateFromString('Sugar, gelatin, unknownstuff');
    const sugar = result.find((r) => r.token === 'sugar');
    const gelatin = result.find((r) => r.token === 'gelatin');
    const unknown = result.find((r) => r.token === 'unknownstuff');
    expect(sugar?.status).toBe('halal');
    expect(gelatin?.status).toBe('haram');
    expect(unknown?.status).toBe('doubtful');
  });
});