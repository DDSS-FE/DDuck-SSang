import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    launchOptions: {
      slowMo: 500,
    },
  },
};
export default config;
