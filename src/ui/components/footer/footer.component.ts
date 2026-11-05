import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base.component';

export class FooterComponent extends BaseComponent {
  constructor(page: Page, root: Locator) {
    super(page, root);
  }
}
