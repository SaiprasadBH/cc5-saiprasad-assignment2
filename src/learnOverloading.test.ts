import { describe, test, expect } from "vitest";
import {
  processQuery,
  HighLevelQuery,
  LowLevelQuery,
} from "./learnOverloading";

describe("processQuery function tests", () => {
  test("processQuery with HighLevelQuery should return ShallowResult", () => {
    const highQuery: HighLevelQuery = { type: "high" };
    const result = processQuery(highQuery);
    expect(result).toEqual({ shallow: true });
  });

  test("processQuery with LowLevelQuery should return DeepResult", () => {
    const lowQuery: LowLevelQuery = { type: "low" };
    const result = processQuery(lowQuery);
    expect(result).toEqual({ deep: true });
  });
});
