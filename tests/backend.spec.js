import { tags, tagName } from "../utils/TestFilter.js";
import { test, chromium } from "@playwright/test";
import JsonPlaceholderPage from "../Pagefactory/Pagerepository/JsonPlaceholderPage";

test.describe("verify API and Backend", () => {
  test(
    tags([tagName.BACKEND], "API for JsonPlaceholder should work correctly"),
    async () => {
      const browser = await chromium.launch();
      const jsonPlaceholderPage = new JsonPlaceholderPage(
        await browser.newPage()
      );
      await jsonPlaceholderPage.verifyGetUserRequest();
    }
  );
});
