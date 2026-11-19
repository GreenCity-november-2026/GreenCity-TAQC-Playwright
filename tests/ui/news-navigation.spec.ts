import { expect, test } from "../support/ui.fixture";
import { en } from "../../src/config/en";

test.describe("Eco News Navigation", () => {
  test("Guest opens Eco News from the header", async ({ homePage, page }) => {
    const newsListPage = await homePage.header.openEcoNews();

    await expect(page).toHaveURL(/#\/greenCity\/news$/);

    await expect(newsListPage.heading).toBeVisible();

    await expect(newsListPage.heading).toHaveText(
      new RegExp(`^${en.news.heading}$`, "i"),
    );

    await expect(newsListPage.newsCards.first()).toBeVisible();

    await expect(newsListPage.createNewsButton).toHaveCount(0);
  });
});
