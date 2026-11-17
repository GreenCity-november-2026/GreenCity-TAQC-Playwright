import { test as base } from '@playwright/test';
import { testValues } from '../../src/config/test-values';
import { HomePage } from '../../src/ui/pages/homepage/home.page';

type UiFixtures = {
  homePage: HomePage;
};

export const test = base.extend<UiFixtures>({
  page: async ({ page }, use) => {
    await page.addInitScript(()=>{
      localStorage.setItem('language', 'en');
      sessionStorage.removeItem('EcoNews-filter');
    });
    await use(page);
  },
  homePage: async ({ page }, use) => {
    await page.goto(testValues.baseUiUrl);
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
