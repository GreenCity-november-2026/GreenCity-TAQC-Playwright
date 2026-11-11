import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base.component';

export class HeaderComponent extends BaseComponent {
  readonly logo: Locator;
  readonly signInLink: Locator;

  constructor(page: Page, root: Locator) {
    super(page, root);

    this.logo = this.root.locator('img[src$="logo.svg"]');
    this.signInLink = this.root.locator('a.header_sign-in-link');
  }

  async openSignIn(): Promise<void> {
    await this.signInLink.click();
  }
}
