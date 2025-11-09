import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PageBanner } from "../../pages/pageBanner";
import { DiTestFixture } from "../../hooks/fixture";

Then("navigates to the login page", async function () {
  const pageBanner = DiTestFixture.di?.resolve(PageBanner);
  await pageBanner?.navigatoToSignUpLogin();
});

Then("the user is logged in to the page", async function () {
  const pageBanner = DiTestFixture.di?.resolve(PageBanner);
  expect(await pageBanner?.isUserLogged()).toBeTruthy;
});

When("the user logs out", async function () {
  const pageBanner = DiTestFixture.di?.resolve(PageBanner);
  await pageBanner?.logoutUser();
  expect(await pageBanner?.isUserLogged()).toBeFalsy();
});

When("the user clicks on Products", async function () {
  const pageBanner = DiTestFixture.di?.resolve(PageBanner);
  await pageBanner?.navigateToProducts();
});
