import { injectable, inject } from "tsyringe";
import type { Page } from "playwright";
import { Logger } from "winston";
import { DiTestFixture } from "../hooks/fixture";
import { PageBanner } from "./pageBanner";

@injectable()
export class CartPage {
  constructor(
    @inject("Page") private page: Page,
    @inject("Logger") private logger: Logger
  ) {}

  private Elements = {
    productItem: "#product-item",
  };

  async checkCartUpdate(productId: string): Promise<boolean> {
    const pageBanner = DiTestFixture.di?.resolve(PageBanner);
    await pageBanner?.navigateToCart();
    const locator = this.Elements.productItem.replace("item", productId);
    try {
      return await this.page.locator(locator).isVisible({ timeout: 10_000 });
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async removeProduct(productId: string) {
    let locatorProductToRemove = await this.page.locator(
      `tr[id='product-${productId}'] a[class='cart_quantity_delete']`
    );
    await locatorProductToRemove.click({ timeout: 10_000 });
    this.logger.info(`Removing product id"${productId}" from cart`);
  }
}
