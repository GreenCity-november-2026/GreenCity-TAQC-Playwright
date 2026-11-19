import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import type { PageFactory } from '../page.factory';

export abstract class GreenCityPage extends BasePage {
  protected constructor(page: Page, factory: PageFactory) {
  super(page, factory);
}

  async isLoaded(): Promise<boolean> {
    return (
      this.page.url().includes('#/greenCity') &&
      (await this.footer.root.isVisible())
    );
  }
}
