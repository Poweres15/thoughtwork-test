import { expect, request } from "@playwright/test";

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

  async verifySuccessResponse(response) {
    await expect(response).toBeOK();
  }

  async GET(endPoint, query) {
    const requestContext = await this.getAndCacheContext(endPoint);
    const response = await requestContext.get(query);
    await this.verifySuccessResponse(response);
    return response;
  }

  async POST(endPoint, query, form) {
    const requestContext = await this.getAndCacheContext(endPoint);
    const response = await requestContext.post(query, { form });
    await this.verifySuccessResponse(response);
    return response;
  }
}
