import { expect, test } from '../support/ui.fixture';
import { NewsListPage } from '../../src/ui/pages/news/news-list.page';
import { en } from '../../src/config/en';

test('Eco News page should be displayed', async ({ page }) => {
  const newsListPage = new NewsListPage(page);

  await newsListPage.open();

  await expect(newsListPage.root).toBeVisible();  
  await expect(newsListPage.heading).toBeVisible();
  await expect(newsListPage.heading).toHaveText(
  new RegExp(`^${en.news.heading}$`, 'i')
  );
});
