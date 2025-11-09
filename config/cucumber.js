module.exports = {
  default: {
    requireModule: ["ts-node/register", "dotenv/config"],
    require: ["src/helper/init.ts", "src/**/*.ts"],
    tags: process.env.TAGS || process.env.npm_config_tags || "",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features/**/*.feature"],
    publishQuiet: true,
    dryRun: false,
    require: ["src/test/steps/*.ts", "src/hooks/di*.ts", "src/support/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 3,
  },
  rerun: {
    requireModule: ["ts-node/register", "dotenv/config"],
    require: ["src/bootstrap/init.ts", "src/**/*.ts"],
    formatOptions: {
      snippetInterface: "async-await",
    },
    publishQuiet: true,
    dryRun: false,
    require: ["src/test/steps/*.ts", "src/hooks/*.ts", "src/support/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 6,
  },
};
