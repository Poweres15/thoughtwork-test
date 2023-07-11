import WebActions from "../../libs/webActions";
import APIActions from "../../libs/apiAction";
import { expect } from "@playwright/test";

export default class JsonPlaceholderPage {
  constructor(page) {
    this.page = page;
    this.baseURL = "https://jsonplaceholder.typicode.com";
    this.webActions = new WebActions(page);
    this.APIActions = new APIActions(page);
  }

  async verifyGetUserRequest() {
    const users = await this.APIActions.GET(this.baseURL, "/users");
    expect(users).toHaveLength(10);
  }
}
