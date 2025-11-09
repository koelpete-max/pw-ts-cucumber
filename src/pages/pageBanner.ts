import { injectable, inject } from "tsyringe";
import type { Page } from "playwright";

@injectable()
export class PageBanner {
  constructor(
    @inject("Page") private page: Page,
    @inject("Logger") private logger: any
  ) {}

  private Elements = {
    pageLogo: "//img[@alt='Website for automation practice']",
    signUpLoginLnk: 'a:has-text("Signup / Login")',
    productsLnk: 'a:has-text(" Products")',
    cartLnk: 'a:has-text(" Cart")',
    loggedInTxt: 'a:has-text("Logged in as ")',
    logoutLnk: 'a:has-text("Logout")',
  };

  async isPageLogoVisible(): Promise<boolean> {
    try {
      this.logger.info(`Check page logo visibility`);
      return await this.page.locator(this.Elements.pageLogo).isVisible();
    } catch (e) {
      this.logger.info(`Page not loaded or timed out: ${e}`);
      return false;
    }
  }

  async navigatoToSignUpLogin() {
    await this.page
      .locator(this.Elements.signUpLoginLnk)
      .click({ timeout: 10_000 });
  }

  async navigateToProducts() {
    await this.page
      .locator(this.Elements.productsLnk)
      .click({ timeout: 10_000 });
  }

  async navigateToCart() {
    await this.page
      .getByText("Cart", { exact: true })
      .click({ timeout: 10_000 });
  }

  async isUserLogged(): Promise<boolean> {
    try {
      const locator = this.page.locator(this.Elements.loggedInTxt);
      const isLogged = await locator.isVisible();
      if (isLogged) {
        const user = await locator.textContent();
        this.logger.info(
          `User '${user?.replace(" Logged in as ", "")}' logged in successfully`
        );
      }
      return isLogged;
    } catch (e) {
      this.logger.warn(`isPageLoaded check failed: ${e}`);
      return false;
    }
  }

  async logoutUser() {
    await this.page.locator(this.Elements.logoutLnk).click({ timeout: 10_000 });
  }
}
