import type { Page } from "playwright";

export class Popups {
  constructor(private page: Page) {}
  private Elements = {
    continueShoppingBtn: 'button:has-text("Continue Shopping")',
  };

  async clickOnContinueShopping() {
    await this.page
      .locator(this.Elements.continueShoppingBtn)
      .click({ timeout: 10_000 });
  }
}
