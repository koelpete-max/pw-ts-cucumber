const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports",
  reportName: "Playwright Automation Report",
  pageTitle: "Automation Execise Site",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "140",
    },
    device: "Local test machine",
    platform: {
      name: "macOs",
      version: "26.0.1",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Nov 4th 2025, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 4th 2025, 02:56 PM EST" },
    ],
  },
});