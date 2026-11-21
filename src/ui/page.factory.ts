import type { Page } from "@playwright/test";
import { HomePage } from "./pages/homepage/home.page";
import { NewsListPage } from "./pages/news/news-list.page";
import { ProfilePage } from "./pages/profile/profile.page";

export class PageFactory {
  constructor(private readonly page: Page) {}

  createHomePage(): HomePage {
    return new HomePage(this.page, this);
  }

  createNewsListPage(): NewsListPage {
    return new NewsListPage(this.page, this);
  }

  createProfilePage(): ProfilePage {
    return new ProfilePage(this.page, this);
  }
}
