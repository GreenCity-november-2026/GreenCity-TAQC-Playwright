import { expect, test } from '../support/ui.fixture';

test('Sign In modal should be displayed', async ({ homePage }) => {
  const authModal = await homePage.header.openSignIn();

  await expect(authModal.emailInput).toBeVisible();
  await expect(authModal.passwordInput).toBeVisible();
});
