import { Locator, Page } from '@playwright/test';
import { Base } from '../base';

export abstract class BaseComponent extends Base {
  protected constructor(
    page: Page,
    readonly root: Locator,
  ) {
    super(page);
  }
}
