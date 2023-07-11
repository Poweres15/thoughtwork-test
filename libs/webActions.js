export default class WebActions {
  constructor(page) {
    this.page = page;
  }

  element(locator, options = {}) {
    return this.page.locator(locator, options);
  }

  async waitForElementToBeVisible(locator, options = {}) {
    return await this.page.waitForSelector(locator, {
      state: "visible",
      timeout: options?.timeout | this._waitElementTimeout,
    });
  }

  async clickElement(locator, options = {}) {
    await this.waitForElementToBeVisible(locator);
    await this.page.click(locator, {
      ...options,
    });
  }

  async enterElementText(locator, text) {
    await this.waitForElementToBeVisible(locator);
    await this.page.fill(locator, text);
  }
}
