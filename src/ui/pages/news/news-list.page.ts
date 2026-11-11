import { Locator, Page } from '@playwright/test';
import { GreenCityPage } from '../green-city.page';

export class NewsListPage extends GreenCityPage {
  readonly root: Locator;
  readonly heading: Locator;
  readonly newsCards: Locator;

  constructor(page: Page) {
    super(page);

    this.root = page.locator('app-news-list');
    this.heading = this.root.locator('h1.main-header');
    this.newsCards = this.root.locator(
      'ul[aria-label="news list"] > li'
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/#/greenCity/news');
    await this.root.waitFor({ state: 'visible' });
  }
}
