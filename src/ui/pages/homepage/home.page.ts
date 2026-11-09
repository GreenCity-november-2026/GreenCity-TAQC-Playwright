import { Page } from '@playwright/test';
import { GreenCityPage } from '../green-city.page';

export class HomePage extends GreenCityPage {
  constructor(page: Page) {
    super(page);
  }
}

