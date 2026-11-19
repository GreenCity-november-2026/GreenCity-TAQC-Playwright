import { Page } from "@playwright/test";
import { GreenCityPage } from "../green-city.page";
import type { PageFactory } from "../../page.factory";

export class ProfilePage extends GreenCityPage {
  constructor(page: Page, factory: PageFactory) {
    super(page, factory);
  }
}
