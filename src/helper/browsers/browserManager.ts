import {
  Browser,
  chromium,
  firefox,
  webkit,
  type LaunchOptions,
} from "playwright";

export async function invokeBrowser(): Promise<Browser> {
  const browserMode = process.env.HEADLESS == "true" ? true : false;
  const raw = (process.env.npm_config_browser ?? "chromium").toLowerCase();
  console.log(`==> Using browser (raw): ${raw} <==`);
  const browserType =
    raw === "chrome" ? "chromium" : (raw as "chromium" | "firefox" | "webkit");

  switch (browserType) {
    case "chromium":
      return await chromium.launch({
        headless: browserMode,
        args: ["--start-maximized"],
      });
    case "firefox":
      return await firefox.launch({ headless: browserMode });
    case "webkit":
      return await webkit.launch({ headless: browserMode });
    default:
      throw new Error(`BrowserType: ${browserType} not supported.`);
  }
}
