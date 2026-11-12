import { expect, test } from '../support/ui.fixture';
import { en } from '../../src/config/en';

test('logo should be displayed on the home page', async ({ homePage }) => {
  await expect(homePage.header.logo).toBeVisible();

  await expect(homePage.header.signInLink).toBeVisible();
  await expect(homePage.header.signInLink).toHaveText(en.auth.signIn);
});
