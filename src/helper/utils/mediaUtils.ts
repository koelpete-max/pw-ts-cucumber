import { TestFixture } from "../../hooks/testFixture";
import * as fs from "fs-extra";

export async function attachOrDeleteVideo(
  world: any,
  path?: string,
  failed?: boolean
) {
  if (!path) return;
  try {
    if (failed) {
      await world.attach(await fs.promises.readFile(path), "video/webm");
    } else {
      await fs.promises.rm(path, { force: true });
    }
  } catch (e) {
    TestFixture.logger.error(e);
  }
}
