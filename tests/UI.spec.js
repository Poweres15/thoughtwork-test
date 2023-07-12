import MarsAirPage from "../PageFactory/PageRepository/MarsAirsPage";
import { tags, tagName } from "../utils/Test-Filter";
import { test } from "@playwright/test";
import { MONTH_OPTIONS } from "../constants/MarsAirConstant";

test.describe("verify user interface", () => {
  let marsAirPage;
  test.beforeEach(async ({ page }) => {
    marsAirPage = new MarsAirPage(page);
    await marsAirPage.visit("/PoweresKittikonrut");
    await marsAirPage.waitForPageToLoad();
  });

  test(tags([tagName.UI], "Verify testing form and field name"), async () => {
    await marsAirPage.verifyDepartLabelName("departure");
    await marsAirPage.verifyReturnLabelName("return");
    await marsAirPage.verifySearhButtonEnable();
  });

  test(
    tags(
      [tagName.UI],
      "Verify every six months fight options displayed for next two years"
    ),
    async () => {
      const optionsCheckers = Object.values(MONTH_OPTIONS).map(
        async (months) => {
          await marsAirPage.verifyDepartOptionAvailableByName(months);
          await marsAirPage.verifyReturnOptionAvailableByName(months);
        }
      );
      await Promise.all(optionsCheckers);
    }
  );
});
