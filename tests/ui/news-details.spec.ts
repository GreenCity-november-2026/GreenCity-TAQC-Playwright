import { test, expect } from "../support/ui.fixture";
import { en } from "../../src/config/en";

test("Guest opens a news item and returns to the list", async ({
  homePage,
  page,
}) => {
  const newsListPage = await homePage.header.openEcoNews();

  const firstCard = newsListPage.getFirstCard();
  const expectedTitle = await firstCard.getTitle();

  const newsDetailPage = await firstCard.open();

  await expect(page).toHaveURL(/#\/greenCity\/news\/\d+$/);
  await expect(newsDetailPage.title).toHaveText(expectedTitle);

  const returnedNewsListPage = await newsDetailPage.backToNews();

  await expect(page).toHaveURL(/#\/greenCity\/news$/);
  await expect(returnedNewsListPage.heading).toHaveText(en.news.heading, {
    ignoreCase: true,
  });
});
