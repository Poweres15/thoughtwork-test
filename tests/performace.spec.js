import getPerformaceBaseTest from "../utils/performace-base-factory";
import { tags, tagName } from "../utils/Test-Filter";
import MarsAirPage from "../PageFactory/PageRepository/MarsAirsPage";
import { expect } from "@playwright/test";

const test = getPerformaceBaseTest([
  { analyzeByBrowser: true, disableAppendToExistingFile: false },
  { scope: "worker" },
]);

test(
  tags([tagName.PERFORMACE], "startup performance"),
  async ({ page, performance }) => {
    const marsAirPage = new MarsAirPage(page);
    performance.sampleStart("MarsAir-startup");
    await marsAirPage.visit("/PoweresKittikonrut");
    await marsAirPage.waitForPageToLoad();
    performance.sampleEnd("MarsAir-startup");
    expect(performance.getSampleTime("Startup")).toBeLessThan(3000);
  }
);
