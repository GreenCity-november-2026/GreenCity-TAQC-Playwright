import { Locator, Page } from "@playwright/test";
import { GreenCityPage } from "../green-city.page";
import type { PageFactory } from "../../page.factory";

export class NewsListPage extends GreenCityPage {
  readonly root: Locator;
  readonly heading: Locator;
  readonly newsCards: Locator;
  readonly createNewsButton: Locator;

  constructor(page: Page, factory: PageFactory) {
    super(page, factory);

    this.root = page.locator("app-news-list");
    this.heading = this.root.locator("h1.main-header");
    this.createNewsButton = this.root.locator("#create-button");
    this.newsCards = this.root.locator('ul[aria-label="news list"] > li');
  }

  async open(): Promise<void> {
    await this.page.goto("/#/greenCity/news");
  }
}
