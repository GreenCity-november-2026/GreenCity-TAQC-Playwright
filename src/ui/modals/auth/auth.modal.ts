import { Locator, Page } from '@playwright/test';
import { BaseModal } from '../base.modal';
import type { ProfilePage } from '../../pages/profile/profile.page';
import type { PageFactory } from '../../page.factory';

export class AuthModal extends BaseModal {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly generalError: Locator;

  constructor(
  page: Page,
  private readonly factory: PageFactory
) {
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

    return this.factory.createProfilePage();
  }

  async getError(): Promise<string> {
    return this.generalError.innerText();
  }
}