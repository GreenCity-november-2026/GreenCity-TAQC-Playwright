import { expect, test } from '../support/ui.fixture';
import { PageFactory } from '../../src/ui/page.factory';
import { en } from '../../src/config/en';

test('Eco News page should be displayed', async ({ page }) => {
  const factory = new PageFactory(page);
const newsListPage = factory.createNewsListPage();

  await newsListPage.open();

  await expect(newsListPage.root).toBeVisible();  
  await expect(newsListPage.heading).toBeVisible();
  await expect(newsListPage.heading).toHaveText(
  new RegExp(`^${en.news.heading}$`, 'i')
  );
});
