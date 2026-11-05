import { test as base } from '@playwright/test';
import { testValues } from '../../src/config/test-values';

export const test = base.extend({
  request: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: testValues.baseApiUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
