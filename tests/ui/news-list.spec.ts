import { expect, test } from '@playwright/test';
import { NewsListPage } from '../../src/ui/pages/news/news-list.page';

test('Eco News page should be displayed', async ({ page }) => {
  const newsListPage = new NewsListPage(page);

  await newsListPage.open();

  await expect(newsListPage.root).toBeVisible();
  await expect(newsListPage.heading).toBeVisible();
});
