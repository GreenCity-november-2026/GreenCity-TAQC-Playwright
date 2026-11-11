import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../components/base.component';

export abstract class BaseModal extends BaseComponent {
  protected constructor(page: Page, root: Locator) {
    super(page, root);
  }

  async isOpen(): Promise<boolean> {
    return this.root.isVisible();
  }

   async close(): Promise<void> {
    await this.root.locator('a.close-modal-window').click();
  }
}
