import { injectable, inject } from "tsyringe";
import type { Page } from "playwright";
import { requiredEnv } from "../helper/env/envUtils";

@injectable()
export class HomePage {
  constructor(
    @inject("Page") private page: Page,
    @inject("Logger") private logger: any
  ) {}
  async navigateTo(url: string = "") {
    const target = url || requiredEnv("BASEURL");
    console.log(`url: ${target}`);
    await this.page.goto(target);
    this.logger.info(`Navigation to page '${target}' completed`);
  }
}
