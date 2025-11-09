import { When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/loginPage";
import { expect } from "@playwright/test";
import { DiTestFixture } from "../../hooks/fixture";

When("the user enters {string} as username", async function (username: string) {
  const loginPage = DiTestFixture.di?.resolve(LoginPage);
  await loginPage?.enterUsername(username);
});

When("enters {string} as password", async function (password: string) {
  const loginPage = DiTestFixture.di?.resolve(LoginPage);
  await loginPage?.enterPassword(password);
});

When("the user clicks the login button", async function () {
  const loginPage = DiTestFixture.di?.resolve(LoginPage);
  await loginPage?.submitLoginData();
});

Then("login should fail", async function () {
  const loginPage = DiTestFixture.di?.resolve(LoginPage);
  expect(await loginPage?.checkInvalidEmailPassword()).toBeTruthy();
});
