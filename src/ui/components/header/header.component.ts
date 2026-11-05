import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base.component';

export class HeaderComponent extends BaseComponent {
  readonly logo: Locator;

  constructor(page: Page, root: Locator) {
    super(page, root);
    this.logo = root.locator('img[src$="logo.svg"]');
  }
}
