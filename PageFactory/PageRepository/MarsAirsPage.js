import WebActions from "../../libs/webActions";
import APIActions from "../../libs/apiAction";
import { expect } from "@playwright/test";
import MarsAirObject from "../ObjectRepository/MarsAirsObject";

export default class MarsAirPage {
  constructor(page) {
    this.page = page;
    this.baseURL = "https://marsair.recruiting.thoughtworks.net";
    this.webActions = new WebActions(page);
    this.APIActions = new APIActions(page);
    this.MarsAirObject = new MarsAirObject();
  }

  async visit(slug = "") {
    await this.webActions.visit(`${this.baseURL}${slug}`, {
      waitUntil: "domcontentloaded",
    });
  }

  async waitForPageToLoad() {
    await this.webActions.waitForElementToBeVisible(
      this.MarsAirObject.marsAirLogo
    );
    await this.webActions.waitForElementToBeVisible(
      this.MarsAirObject.contentBox
    );

    await this.webActions.waitForElementToBeVisible(
      this.MarsAirObject.welcomeToMarsairHeader
    );
  }

  async verifyDepartLabelName(expectedName) {
    const depatureLabel = this.webActions.element(
      this.MarsAirObject.departLabel
    );
    await expect(depatureLabel).toHaveText(expectedName);
  }

  async verifyReturnLabelName(expectedName) {
    const returnLabel = this.webActions.element(this.MarsAirObject.returnLabel);
    await expect(returnLabel).toHaveText(expectedName);
  }

  async verifySearhButtonEnable() {
    await expect(this.MarsAirObject.searchButton).toHaveText(expectedName);
  }

  async verifyDepartOptionAvailableByName(monthName) {
    const departureOptions = this.webActions.element(
      this.MarsAirObject.depatureOptionByMonth(monthName)
    );
    await expect(departureOptions).toBeAttached();
  }

  async verifyReturnOptionAvailableByName(monthName) {
    const returnOptions = this.webActions.element(
      this.MarsAirObject.returnOptionByMonth(monthName)
    );
    await expect(returnOptions).toBeAttached();
  }

  async selectDepatureMonth(monthName) {
    await this.page.selectOption(this.MarsAirObject.departSelectBox, {
      label: `${monthName}`,
    });
  }

  async selectReturnMonth(monthName) {
    await this.page.selectOption(this.MarsAirObject.returnSelectBox, {
      label: `${monthName}`,
    });
  }

  async fillSearchFormAndSubmit(departMonth, returnMonth, promitionCode = "") {
    await this.selectDepatureMonth(departMonth);
    await this.selectReturnMonth(returnMonth);
    if (promitionCode.length > 1) {
      await this.page.fill(
        this.MarsAirObject.promitionCodeInput,
        promitionCode
      );
    }
    await this.webActions.clickElement(this.MarsAirObject.searchButton);
  }

  async verifyMessageShouldHaveShown(messageArray) {
    await Promise.all(
      messageArray.map(async (expectedMessage) => {
        const messageElement = this.webActions.element(
          this.MarsAirObject.resultMessage(expectedMessage)
        );
        await expect(messageElement).toBeVisible();
      })
    );
  }

  async verifyValidCodeMessage(code, discountPercentage) {
    const Message = await this.webActions
      .element(this.MarsAirObject.promotionCodeMessage)
      .textContent();
    expect(Message).toEqual(
      `Promotional code ${code} used: ${discountPercentage} discount!`
    );
  }

  async verifyInvalidCodeMessage(code) {
    const Message = await this.webActions
      .element(this.MarsAirObject.promotionCodeMessage)
      .textContent();
    expect(Message).toEqual(`Sorry, code ${code} is not valid`);
  }

  async verifySearchResultHeaderDisplayed() {
    await expect(async () => {
      await expect(
        this.webActions.element(this.MarsAirObject.searchResultHeader)
      ).toBeVisible();
    }).toPass();
  }

  async clickMarsAirLogo() {
    await this.webActions.clickElement(this.MarsAirObject.marsAirLogo);
  }

  async verifyHomePageResponseWithAPI(slug) {
    const response = await this.APIActions.GET(this.baseURL, slug);
    const reponseText = await response.text();
    expect(reponseText).toContain(`<title>Mars Airlines: Home</title>`);
    expect(reponseText).toContain(`<h2>Welcome to MarsAir!</h2>`);
  }

  async verifySubmitSearchWithAPI(slug, form) {
    const response = await this.APIActions.POST(this.baseURL, slug, form);
    const reponseText = await response.text();
    expect(reponseText).toContain(`<h2>Search Results</h2>`);
    expect(reponseText).toContain(`<p>Call now on 0800 MARSAIR to book!</p`);
  }
}
