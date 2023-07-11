import getPerformaceBaseTest from "../utils/performace-base-factory";
import { tags, tagName } from "../utils/Test-Filter";

const test = getPerformaceBaseTest([
  { analyzeByBrowser: true, disableAppendToExistingFile: false },
  { scope: "worker" },
]);

test(
  tags([tagName.PERFORMACE], "startup performance"),
  async ({ page, performance }) => {
    performance.sampleStart("GH-startup");
    await page.goto("http://github.com/");
    performance.sampleEnd("GH-startup");

    performance.sampleStart("SF-startup");
    await page.goto("https://sourceforge.net/");
    performance.sampleEnd("SF-startup");
  }
);
