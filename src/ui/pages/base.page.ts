import { Page } from '@playwright/test';
import { Base } from '../base';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';

export abstract class BasePage extends Base {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  protected constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page, page.locator('app-header'));
    this.footer = new FooterComponent(page, page.locator('footer'));
  }
}
