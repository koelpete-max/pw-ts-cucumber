import "reflect-metadata";
import {
  BeforeAll,
  Before,
  AfterAll,
  After,
  AfterStep,
  Status,
  setDefaultTimeout,
  type ITestStepHookParameter,
} from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { TestFixture } from "./testFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../util/logger";
import { attachOrDeleteVideo } from "../helper/utils/mediaUtils";

setDefaultTimeout(60 * 1000);
getEnv();

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  TestFixture.logger = createLogger(options(scenarioName));

  context = await browser.newContext({
    storageState: "./state.json",
    viewport: null, // ✅ needed to respect window size
    recordVideo: {
      dir: "./test-results/videos",
    },
  });

  const page = await context.newPage();
  TestFixture.page = page;

  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(30_000);
});

After(async function ({ result, pickle }) {
  const img = await saveCurrentUiImage(pickle.name, "after");
  this.attach(img, "image/png");

  await TestFixture.page.close();
  await context.close();

  const videoPath = await TestFixture.page.video()?.path();
  if (!videoPath) {
    return;
  }

  await attachOrDeleteVideo(
    this,
    await TestFixture.page.video()?.path(),
    result?.status === Status.FAILED || result?.status === Status.PASSED
  );

  // const videoPath = await TestFixture.page.video()?.path();
  // if (!videoPath) {
  //   return;
  // }
  // if (result?.status == Status.FAILED || result?.status == Status.AMBIGUOUS) {
  //     try {
  //       this.attach(fs.readFileSync(videoPath), "video/webm");
  //     } catch (err) {
  //       TestFixture.logger.error(err);
  //     }
  // }
  // else {
  //     fs.rmSync(videoPath, { force: true });
  // }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
  if (TestFixture?.logger) {
    TestFixture.logger.close();
  }
});

AfterStep(async function ({
  result,
  pickle,
  pickleStep,
}: ITestStepHookParameter) {
  if (result?.status === Status.FAILED && TestFixture.page) {
    const img = await saveCurrentUiImage(pickle.name, pickleStep.text);
    this.attach(img, "image/png");
  } else {
    console.log(`status: ${result?.status}`);
  }
});

/*
 * Helpers
 */

async function saveCurrentUiImage(
  scenario: string,
  step: string
): Promise<Buffer> {
  const name = `${scenario}`.replace(/[^\w-]+/g, "_");
  const stepText = step?.replace(/[^\w-]+/g, "_") ?? "step";
  const fileSafe = `./test-results/screenshots/${name}-${stepText}.png`;
  return await TestFixture.page.screenshot({
    fullPage: true,
    path: fileSafe,
    type: "png",
  });
}
