import { Locator, Page } from '@playwright/test';
import { BaseModal } from '../base.modal';
import { ProfilePage } from '../../pages/profile/profile.page';

export class AuthModal extends BaseModal {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly generalError: Locator;

  constructor(page: Page) {
    super(page, page.locator('app-auth-modal'));

    this.emailInput = this.root.locator('#email');
    this.passwordInput = this.root.locator('#password');
    this.submitButton = this.root.locator('button[type="submit"]');
    this.generalError = this.root.locator('.alert-general-error');
  }

  async signIn(email: string, password: string): Promise<ProfilePage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();

    await this.page.waitForURL(
      /#\/greenCity\/profile(?:\/[^/?#]+)?(?:\?.*)?$/
    );

    return new ProfilePage(this.page);
  }

  async getError(): Promise<string> {
    return this.generalError.innerText();
  }
}