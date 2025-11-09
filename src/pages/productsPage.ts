import { TestFixture } from "../hooks/testFixture";
import { Popups } from "./popups";
import { injectable, inject } from "tsyringe";
import type { Page } from "playwright";

@injectable()
export class ProductsPage {
  constructor(
    @inject("Page") private page: Page,
    @inject("Logger") private logger: any
  ) {}

  private Elements = {
    searchProductsEdt: "#search_product",
    magnifierBtn: ".fa.fa-search",
    addToCartLnk:
      "//div[@class='productinfo text-center']//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart']",
    addToCartBtn:
      "div[class='productinfo text-center'] a[class='btn btn-default add-to-cart']",
  };

  async searchAndAddToCart(product: string) {
    await this.searchProduct(product);
    await this.setProductId(product);
    console.log(`Product ID: ${TestFixture.productId}`);
    await this.page?.locator(this.Elements.addToCartLnk).hover();
    await this.page?.locator(this.Elements.addToCartBtn).click();
    this.logger.info(`Adding product  "${product}"`);
    const popups = new Popups(this.page);
    await popups.clickOnContinueShopping();
    this.logger.info(`Adding product  "${product}"`);
  }

  private async searchProduct(product: string) {
    await this.page?.locator(this.Elements.searchProductsEdt).fill(product);
    await this.page?.locator(this.Elements.magnifierBtn).click();
    console.log(`===> productName: ${product}`);
  }

  private async setProductId(product: string) {
    const locator = this.page?.locator(this.Elements.addToCartLnk);
    const productIdAttr = await locator.getAttribute("data-product-id");
    if (!productIdAttr) {
      throw new Error(`Product ID not found for product "${product}"`);
    }
    TestFixture.productId = productIdAttr;
  }
}
