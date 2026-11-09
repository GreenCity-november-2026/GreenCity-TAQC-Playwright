import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export abstract class GreenCityPage extends BasePage {
  protected constructor(page: Page) {
    super(page);
  }

  async isLoaded(): Promise<boolean> {
    return (
      this.page.url().includes('#/greenCity') &&
      (await this.footer.root.isVisible())
    );
  }
}
