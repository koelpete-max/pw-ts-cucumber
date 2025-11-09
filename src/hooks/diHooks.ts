import "reflect-metadata";
import { container } from "tsyringe";
import {
  BeforeAll,
  Before,
  AfterAll,
  After,
  AfterStep,
  Status,
  setDefaultTimeout,
  type ITestStepHookParameter,
  BeforeStep,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { DiTestFixture } from "./fixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger, Logger } from "winston";
import { options } from "../util/logger";
import { attachOrDeleteVideo } from "../helper/utils/mediaUtils";

setDefaultTimeout(60 * 1000);
getEnv();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let logger: any;
let lastStep: string;

BeforeAll(async function () {
  const di = container.createChildContainer();
  browser = await invokeBrowser();
  di.registerInstance("Browser", browser);
  DiTestFixture.di = di;
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  logger = createLogger(options(scenarioName));
  DiTestFixture.di?.registerInstance("Logger", logger);

  context = await browser.newContext({
    storageState: "./state.json",
    viewport: null, // ✅ needed to respect window size
    recordVideo: {
      dir: "./test-results/videos",
    },
  });
  DiTestFixture.di?.registerInstance("Context", context);

  page = await context.newPage();
  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(30_000);
  DiTestFixture.di?.registerInstance("Page", page);

  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(30_000);
});

BeforeStep(async function ({ pickleStep }) {
  lastStep = pickleStep.text;
  console.log(`beforeStep lastStep: ${lastStep}`);
});

AfterStep(async function ({ result, pickle, pickleStep }) {
  console.log(`afterStep lastStep: ${lastStep}`);
  const page = DiTestFixture.di?.resolve<Page>("Page");
  if (result?.status === Status.FAILED && page) {
    const img = await saveCurrentUiImage(page, pickle.name, pickleStep.text);
    this.attach(img, "image/png");
  } else {
    console.log(`status: ${result?.status}`);
  }
});

After(async function ({ result, pickle }) {
  console.log(`after lastStep: ${lastStep}`);
  if (!DiTestFixture.di) {
    console.log("===> ERROR: TestFixture is null <===");
    return;
  }
  // take screenshot while page is still open
  const page = DiTestFixture.di?.resolve<Page>("Page");
  const img = await saveCurrentUiImage(page, pickle.name, "after");
  this.attach(img, "image/png");

  const videoPath = await page.video()?.path();
  if (videoPath) {
    await attachOrDeleteVideo(
      this,
      videoPath,
      result?.status === Status.FAILED || result?.status === Status.PASSED
    );
  }

  await page.close();
});

AfterAll(async function () {
  const browser = DiTestFixture.di?.resolve<Page>("Browser");

  await browser?.close();
  logger?.close();
  DiTestFixture.di = null;
});

/*
 * Helpers
 */

async function saveCurrentUiImage(
  page: Page,
  scenario: string,
  step: string
): Promise<Buffer> {
  const name = `${scenario}`.replace(/[^\w-]+/g, "_");
  const stepText = step?.replace(/[^\w-]+/g, "_") ?? "step";
  const fileSafe = `./test-results/screenshots/${name}-${stepText}.png`;
  return await page.screenshot({
    fullPage: true,
    path: fileSafe,
    type: "png",
  });
}
