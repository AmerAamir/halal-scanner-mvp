import { describe, it, expect } from 'vitest';
import { loadIngredients, loadEnumbers, loadCertifiers } from '../src/index';

describe('rules data', () => {
  it('loads ingredients, enumbers and certifiers', async () => {
    const [ings, enums, certs] = await Promise.all([
      loadIngredients(),
      loadEnumbers(),
      loadCertifiers()
    ]);
    expect(ings.length).toBeGreaterThan(0);
    expect(enums.length).toBeGreaterThan(0);
    expect(Object.keys(certs).length).toBeGreaterThan(0);
  });
});