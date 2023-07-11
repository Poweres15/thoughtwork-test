import base from "@playwright/test";
import { playwrightPerformance } from "playwright-performance";

const getPerformaceBaseTest = (performanceOptions) => {
  return base.extend({
    performance: playwrightPerformance.performance,
    performanceOptions,
    worker: [playwrightPerformance.worker, { scope: "worker", auto: true }],
  });
};

export default getPerformaceBaseTest;
