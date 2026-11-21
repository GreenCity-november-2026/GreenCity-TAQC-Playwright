import { expect, test } from "../support/ui.fixture";
import { en } from "../../src/config/en";

test("Eco News page should be displayed", async ({ pages }) => {
  const newsListPage = pages.createNewsListPage();

  await newsListPage.open();

  await expect(newsListPage.root).toBeVisible();
  await expect(newsListPage.heading).toBeVisible();
  await expect(newsListPage.heading).toHaveText(
    new RegExp(`^${en.news.heading}$`, "i"),
  );
});
