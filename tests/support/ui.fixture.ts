import { test as base } from "@playwright/test";
import { testValues } from "../../src/config/test-values";
import type { HomePage } from "../../src/ui/pages/homepage/home.page";
import { PageFactory } from "../../src/ui/page.factory";

type UiFixtures = {
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
  homePage: async ({ page }, use) => {
    const factory = new PageFactory(page);
    await page.goto(testValues.baseUiUrl);
    await use(factory.createHomePage());
  },
});

export { expect } from "@playwright/test";
