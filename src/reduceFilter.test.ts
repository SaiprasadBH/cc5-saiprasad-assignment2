import { describe, test, expect } from "vitest";
import { genericReduce, genericFilter } from "./reduceFilter";

describe("genericReduce", () => {
  test("should sum an array of numbers", () => {
    const numbers = [1, 2, 3, 4, 5];
    const sum = genericReduce(numbers, (acc, curr) => acc + curr, 0);
    expect(sum).toBe(15);
  });
});

describe("genericFilter", () => {
  test("should filter out even numbers", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const evenNumbers = genericFilter(numbers, (num) => num % 2 === 0);
    expect(evenNumbers).toEqual([2, 4, 6]);
  });
});
