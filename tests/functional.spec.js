import { tags, tagName } from "../utils/Test-Filter";
import { test } from "@playwright/test";
import { MONTH_OPTIONS, MESSAGE } from "../constants/MarsAirConstant";
import { generatePromitionFromFirstDigit } from "../utils/GenerateRandomPromotion";
import MarsAirPage from "../PageFactory/PageRepository/MarsAirsPage";

test.describe("functional tesing", () => {
  let marsAirPage;
  test.beforeEach(async ({ page }) => {
    marsAirPage = new MarsAirPage(page);
    await marsAirPage.visit("/PoweresKittikonrut");
    await marsAirPage.waitForPageToLoad();
  });

  test(
    tags(
      [tagName.FUNTIONAL],
      "Valid Date with avaliable seat without promotion"
    ),
    async () => {
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.DECEMBER_NEXT_TWO_YEAR
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyMessageShouldHaveShown([
        MESSAGE.SEAT_AVAILABLE,
        MESSAGE.CALL_TO_BOOK,
      ]);
    }
  );

  test(
    tags(
      [tagName.FUNTIONAL],
      "Valid Date with unavaliable seat without promotion"
    ),
    async () => {
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.JULY_NEXT_YEAR
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyMessageShouldHaveShown([
        MESSAGE.SEAT_NOT_AVAILABLE,
      ]);
    }
  );

  test(
    tags([tagName.FUNTIONAL], "Valid Date with avaliable seat with promotion"),
    async () => {
      const { code, discountPercentage } = generatePromitionFromFirstDigit(2);
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.DECEMBER_NEXT_TWO_YEAR,
        code
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyMessageShouldHaveShown([
        MESSAGE.SEAT_AVAILABLE,
        MESSAGE.CALL_TO_BOOK,
      ]);
      await marsAirPage.verifyValidCodeMessage(code, discountPercentage);
    }
  );

  test(
    tags(
      [tagName.FUNTIONAL],
      "Valid Date with unavaliable seat with promotion"
    ),
    async () => {
      const { code, discountPercentage } = generatePromitionFromFirstDigit(2);
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.JULY_NEXT_YEAR,
        code
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyMessageShouldHaveShown([
        MESSAGE.SEAT_NOT_AVAILABLE,
      ]);
    }
  );

  test(
    tags(
      [tagName.FUNTIONAL],
      "Invalid Date,same month on both depature and return with promotion"
    ),
    async () => {
      const { code } = generatePromitionFromFirstDigit(2);
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.JULY,
        code
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyMessageShouldHaveShown([
        MESSAGE.INVALID_RETURN_DATE,
      ]);
    }
  );

  test(
    tags([tagName.FUNTIONAL], "Verify promotion code with wrong format"),
    async () => {
      const invalidCode = "AB1-DE-123";
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.DECEMBER_NEXT_TWO_YEAR,
        invalidCode
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyInvalidCodeMessage(invalidCode);
    }
  );

  test(
    tags(
      [tagName.FUNTIONAL],
      "Verify invalid promition code with first digit as negative number"
    ),
    async () => {
      const { code } = generatePromitionFromFirstDigit(-1);
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.DECEMBER_NEXT_TWO_YEAR,
        code
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.verifyInvalidCodeMessage(code);
    }
  );

  test(
    tags(
      [tagName.FUNTIONAL],
      "Verify click marsair log taking user to honmepage"
    ),
    async () => {
      await marsAirPage.fillSearchFormAndSubmit(
        MONTH_OPTIONS.JULY,
        MONTH_OPTIONS.DECEMBER_NEXT_TWO_YEAR
      );
      await marsAirPage.verifySearchResultHeaderDisplayed();
      await marsAirPage.clickMarsAirLogo();
      await marsAirPage.waitForPageToLoad();
    }
  );
});
