// src/support/browser.ts
import { chromium, firefox, webkit, type BrowserType } from 'playwright';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export function resolveBrowserName(world?: { parameters?: any }): BrowserName {
  // Priority:
  // 1) cucumber --world-parameters '{"browser":"webkit"}'
  const fromWorld = world?.parameters?.browser as string | undefined;

  // 2) direct CLI arg when running cucumber-js directly (not via npm)
  const fromCli = process.argv.find(a => a.startsWith('--browser='))?.split('=')[1];

  // 3) env vars (most reliable when using npm scripts)
  const fromEnv = process.env.PW_BROWSER ?? process.env.BROWSER;

  const raw = (fromWorld ?? fromCli ?? fromEnv ?? 'chromium').toLowerCase();

  if (raw === 'chromium' || raw === 'firefox' || raw === 'webkit') return raw as BrowserName;

  console.warn(`Unknown browser "${raw}", defaulting to "chromium".`);
  return 'chromium';
}

// Return the actual Playwright launcher object, not a string
export function getBrowserModule(name: BrowserName): BrowserType {
  switch (name) {
    case 'firefox': return firefox;
    case 'webkit':  return webkit;
    default:        return chromium;
  }
}