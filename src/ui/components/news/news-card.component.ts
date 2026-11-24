import type { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base.component";
import type { PageFactory } from "../../page.factory";
import type { NewsDetailPage } from "../../pages/news/news-detail.page";

export class NewsCard extends BaseComponent {
  constructor(
    page: Page,
    root: Locator,
    private readonly factory: PageFactory,
  ) {
    super(page, root);
  }

  async getTitle(): Promise<string> {
    return this.root.getByRole("heading", { level: 3 }).innerText();
  }

  async open(): Promise<NewsDetailPage> {
    await this.root.locator("a[href*='/greenCity/news/']").click();
    return this.factory.createNewsDetailPage();
  }
}
