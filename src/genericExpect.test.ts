import { expect } from "./genericExpect";
import { test, describe } from "vitest";
describe("generic Expect test", () => {
  test("toBe and not.toBe tests", () => {
    expect(5).toBe(5);
    expect("Saiprasad").toBe("Saiprasad");
    expect("Saiprasad").not.toBe("Hi");
    expect(5).not.toBe(4);
  });
});
