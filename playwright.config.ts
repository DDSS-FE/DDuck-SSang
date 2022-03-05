import { PlaywrightTestConfig, devices } from '@playwright/test';
const config: PlaywrightTestConfig = {
  workers: process.env.CI ? 2 : undefined,
  retries: 2,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 1000,
    },
    video: 'on',
  },
  projects: [
    // {
    //   name: 'Desktop Chromium',
    //   use: {
    //     browserName: 'chromium',
    //   },
    // },
    // Test against mobile viewports.
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
};

module.exports = config;
