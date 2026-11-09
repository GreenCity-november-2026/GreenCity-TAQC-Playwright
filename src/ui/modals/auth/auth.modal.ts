import { Locator, Page } from '@playwright/test';
import { BaseModal } from '../base.modal';

export class AuthModal extends BaseModal {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, page.locator('app-auth-modal'));

    this.emailInput = this.root.locator('input[type="email"]');
    this.passwordInput = this.root.locator('input[type="password"]');
    this.submitButton = this.root.locator('button[type="submit"]');
  }

  async waitUntilVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

