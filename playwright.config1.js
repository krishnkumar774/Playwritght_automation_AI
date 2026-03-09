// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 2,
  workers: 3,
  timeout: 10 * 1000,
  expect: {
    timeout: 10000
  },
  reporter: 'html',
  projects: [
    {
      name: 'microsoft-edge', 
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure', 
  }},
  {
   name: 'mobile-chrome',
   use: {
        browserName: 'chromium',
        headless: false,
        ...devices['iPhone 11'], // Use any device screen size
        ignoreHTTPSErrors: true,        // Ignore SSL certification errors for testing
        permissions: ['geolocation'], // Grant location permission when pop-up appears
        //viewport: { width: 1280, height: 800 }, // Set custom viewport size for mobile testing  
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on',    // log all steps for debugging
   }}
  ]
});

