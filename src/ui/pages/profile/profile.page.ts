import { Page } from '@playwright/test';
import { GreenCityPage } from '../green-city.page';

export class ProfilePage extends GreenCityPage {
  constructor(page: Page) {
    super(page);
  }
}
