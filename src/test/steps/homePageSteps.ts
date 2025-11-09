import { Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { PageBanner } from "../../pages/pageBanner";
import { DiTestFixture } from "../../hooks/fixture";

Given("the user navigates to the web page", async function () {
  const homePage = DiTestFixture.di?.resolve(HomePage);
  const pageBanner = DiTestFixture.di?.resolve(PageBanner);
  await homePage?.navigateTo();
  expect(await pageBanner?.isPageLogoVisible()).toBeTruthy();
});
