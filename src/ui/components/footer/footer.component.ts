import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base.component";
import type { PageFactory } from "../../page.factory";

export class FooterComponent extends BaseComponent {
  constructor(
    page: Page,
    root: Locator,
    private readonly factory: PageFactory,
  ) {
    super(page, root);
  }
}
