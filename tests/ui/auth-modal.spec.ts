import { expect, test } from '../support/ui.fixture';
import { AuthModal } from '../../src/ui/modals/auth/auth.modal';

test('Sign In modal should be displayed', async ({ homePage, page }) => {
  await homePage.header.openSignIn();

  const authModal = new AuthModal(page);

  await expect(authModal.emailInput).toBeVisible();
  await expect(authModal.passwordInput).toBeVisible();
});

test('Sign In modal should close', async ({ homePage, page }) => {
  await homePage.header.openSignIn();

  const authModal = new AuthModal(page);

  await authModal.close();

  await expect(page.locator('app-auth-modal')).not.toBeVisible();
});