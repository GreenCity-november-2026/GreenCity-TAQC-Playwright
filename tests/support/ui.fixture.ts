import { test as base } from "@playwright/test";
import { testValues } from "../../src/config/test-values";
import type { HomePage } from "../../src/ui/pages/homepage/home.page";
import { PageFactory } from "../../src/ui/page.factory";

type UiFixtures = {
  pages: PageFactory;
  homePage: HomePage;
};

export const test = base.extend<UiFixtures>({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.setItem("language", "en");
      sessionStorage.removeItem("EcoNews-filter");
    });
    await use(page);
  },
  pages: async ({ page }, use) => {
    await use(new PageFactory(page));
  },

  homePage: async ({ page, pages }, use) => {
    await page.goto(testValues.baseUiUrl);

    await use(pages.createHomePage());
  },
});

export { expect } from "@playwright/test";
