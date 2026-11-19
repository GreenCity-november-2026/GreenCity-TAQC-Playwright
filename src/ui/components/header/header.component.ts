import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base.component";
import { AuthModal } from "../../modals/auth/auth.modal";
import type { NewsListPage } from "../../pages/news/news-list.page";
import type { PageFactory } from "../../page.factory";

export class HeaderComponent extends BaseComponent {
  readonly logo: Locator;
  readonly signInLink: Locator;
  readonly ecoNewsLink: Locator;

  constructor(
    page: Page,
    root: Locator,
    private readonly factory: PageFactory,
  ) {
    super(page, root);

    this.logo = this.root.locator('img[src$="logo.svg"]');
    this.signInLink = this.root.locator("a.header_sign-in-link");
    this.ecoNewsLink = this.root.locator('a[href="#/greenCity/news"]');
  }

  async openSignIn(): Promise<AuthModal> {
    await this.signInLink.click();
    return new AuthModal(this.page, this.factory);
  }

  async openEcoNews(): Promise<NewsListPage> {
    await this.ecoNewsLink.click();
    return this.factory.createNewsListPage();
  }
}
