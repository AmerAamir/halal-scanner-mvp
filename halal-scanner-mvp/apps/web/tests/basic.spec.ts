import { test, expect } from '@playwright/test';

test('home page -> results page evaluation', async ({ page }) => {
  await page.goto('/');
  const textarea = page.getByPlaceholder('Paste ingredients list here');
  await textarea.fill('sugar, gelatin');
  await page.getByRole('button', { name: /evaluate/i }).click();
  await page.waitForURL('**/results?*');
  // Check that results table contains sugar as halal and gelatin as haram
  const sugarRow = page.locator('tr', { hasText: 'sugar' });
  await expect(sugarRow).toContainText('halal');
  const gelatinRow = page.locator('tr', { hasText: 'gelatin' });
  await expect(gelatinRow).toContainText('haram');
});