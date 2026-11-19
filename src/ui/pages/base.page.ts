import { Page } from '@playwright/test';
import { Base } from '../base';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import type { PageFactory } from '../page.factory';

export abstract class BasePage extends Base {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  protected constructor(page: Page, factory: PageFactory) {
  super(page);

  this.header = new HeaderComponent(
    page,
    page.locator('app-header'),
    factory
  );

  this.footer = new FooterComponent(page, page.locator('footer'));
}
}
