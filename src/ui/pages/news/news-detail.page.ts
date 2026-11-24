import { Locator, Page } from "@playwright/test";
import { GreenCityPage } from "../green-city.page";
import type { PageFactory } from "../../page.factory";
import type { NewsListPage } from "./news-list.page";

export class NewsDetailPage extends GreenCityPage {
  readonly root: Locator;
  readonly title: Locator;
  readonly backToNewsLink: Locator;

  constructor(
    page: Page,
    private readonly factory: PageFactory,
  ) {
    super(page, factory);

    this.root = page.locator("app-eco-news-detail");
    this.title = this.root.locator(".news-title");
    this.backToNewsLink = this.root.getByRole("link", {
      name: "Back to News",
    });
  }

  async backToNews(): Promise<NewsListPage> {
    await this.backToNewsLink.click();
    return this.factory.createNewsListPage();
  }
}
