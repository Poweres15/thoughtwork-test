import {
  expect,
  request,
  APIRequestContext,
  APIResponse,
  Page,
} from "@playwright/test";

export default class APIActions {
  constructor(page, cacheContext = {}) {
    this.page = page;
    this.cacheContext = cacheContext;
  }

  async getAndCacheContext(baseURL) {
    if (baseURL in this.cacheContext) {
      return this.cacheContext[baseURL];
    }

    this.cacheContext[baseURL] = await request.newContext({
      baseURL,
    });
    return this.cacheContext[baseURL];
  }

  async verifySuccessResponseAndReturnData(response) {
    await expect(response).toBeOK();
    const responseData = await response.json();
    return responseData;
  }

  async GET(endPoint, query) {
    const requestContext = await this.getAndCacheContext(endPoint);
    const response = await requestContext.get(`${endPoint}${query}`);
    return await this.verifySuccessResponseAndReturnData(response);
  }
}
