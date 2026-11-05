import { expect, test } from '../support/ui.fixture';

test('logo should be displayed on the home page', async ({ homePage }) => {
  await expect(homePage.header.logo).toBeVisible();
});
