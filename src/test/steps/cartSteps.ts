import { Then, When } from "@cucumber/cucumber";
import { DiTestFixture } from "../../hooks/fixture";
import { TestFixture } from "../../hooks/testFixture";
import { CartPage } from "../../pages/cartPage";
import { expect } from "@playwright/test";

Then("the cart badge should be updated", async function () {
  const cartPage = DiTestFixture.di?.resolve(CartPage);
  expect(await cartPage?.checkCartUpdate(TestFixture.productId)).toBeTruthy();
});

When("the user removes the added product from the cart", async function () {
  const cartPage = DiTestFixture.di?.resolve(CartPage);
  await cartPage?.removeProduct(TestFixture.productId);
});

Then("the product should be removed", async function () {
  const cartPage = DiTestFixture.di?.resolve(CartPage);
  expect(await cartPage?.checkCartUpdate(TestFixture.productId)).toBeFalsy();
});
