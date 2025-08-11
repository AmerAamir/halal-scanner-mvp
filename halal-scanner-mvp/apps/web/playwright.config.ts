import { type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000'
  },
  webServer: {
    command: 'pnpm --filter @halalscanner/web dev',
    port: 3000,
    reuseExistingServer: true
  }
};

export default config;