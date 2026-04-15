// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  timeout: 360 * 1000,
  expect: {
    timeout: 30000
  },
  reporter: 'html',
use: {
browserName: 'chromium',
headless: false,
ignoreHTTPSErrors: true,
screenshot: 'only-on-failure', // has on, off and on-first-retry options
video: 'retain-on-failure',
trace: 'retain-on-failure',  // has on ,off and on-first-retry options
  }


});

