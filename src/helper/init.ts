import "reflect-metadata";
import fs from "fs-extra";
import { requiredEnv } from "../helper/env/envUtils";

const resultDir: string = "test-results";

try {
  function createDir(path: string) {
    fs.ensureDir(path);
    fs.emptyDir(path);
    console.log(`Folder '${path}' created`);
  }
  createDir(resultDir);
} catch (error) {
  console.log("Folder not created" + error);
}
