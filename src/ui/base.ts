import { Locator, Page } from '@playwright/test';

export abstract class Base {
  protected constructor(protected readonly page: Page) {}

  async scrollToElement(target: Locator): Promise<void> {
    await target.scrollIntoViewIfNeeded();
  }

  async scrollToMiddleOfPage(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
  }

  async scrollToEndOfPage(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
  }
}
