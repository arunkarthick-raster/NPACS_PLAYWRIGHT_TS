// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  
  testDir: './tests',
  timeout: 50*1000,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: "on"
  },
  
});

