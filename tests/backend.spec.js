import { tags, tagName } from "../utils/Test-Filter";
import { test } from "@playwright/test";
import MarsAirPage from "../PageFactory/PageRepository/MarsAirsPage";

test.describe("verify API and Backend", () => {
  let marsAirPage;
  test.beforeEach(async ({ page }) => {
    marsAirPage = new MarsAirPage(page);
  });
  test(tags([tagName.BACKEND], "verify homepage reponse"), async () => {
    await marsAirPage.verifyHomePageResponseWithAPI("/PoweresKittikonrut");
  });
  test(tags([tagName.BACKEND], "verify Submit search response"), async () => {
    await marsAirPage.verifySubmitSearchWithAPI("/PoweresKittikonrut", {
      departing: "0",
      returning: "5",
      promotional_code: "",
    });
  });
});
