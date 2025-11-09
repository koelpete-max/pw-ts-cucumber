import { Page } from "@playwright/test";
import { Logger } from "winston";

export class TestFixture {
  static page: Page;
  static productId: string;
  static logger: Logger;
}
