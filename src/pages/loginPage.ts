import { injectable, inject } from "tsyringe";
import type { Page } from "playwright";
import { Logger } from "winston";

@injectable()
export class LoginPage {
  constructor(
    @inject("Page") private page: Page,
    @inject("Logger") private logger: Logger
  ) {}

  private Elements = {
    userEdt: "//input[@data-qa='login-email']",
    passwordEdt: 'input[name="password"]',
    loginBtn: 'button:has-text("Login")',
    invalidUserMsg: 'p:has-text("Your email or password is incorrect!")',
  };

  async enterUsername(username: string) {
    await this.page?.fill(this.Elements.userEdt, username);
  }

  async enterPassword(password: string) {
    await this.page?.fill(this.Elements.passwordEdt, password);
  }

  async submitLoginData() {
    await this.page?.click(this.Elements.loginBtn);
  }

  async checkInvalidEmailPassword(): Promise<boolean> {
    try {
      return await this.page
        ?.locator(this.Elements.invalidUserMsg)
        .isVisible({ timeout: 5000 });
    } catch (e) {
      this.logger.info(`Failed to log user: '${e}'`);
      return false;
    }
  }
}
