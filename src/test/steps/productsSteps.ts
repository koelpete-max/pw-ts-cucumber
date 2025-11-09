import { When } from "@cucumber/cucumber";
import { ProductsPage } from "../../pages/productsPage";
import { DiTestFixture } from "../../hooks/fixture";

When(
  "searches and adds the product {string} to the cart",
  async function (product: string) {
    const productsPage = DiTestFixture.di?.resolve(ProductsPage);
    await productsPage?.searchAndAddToCart(product);
  }
);
