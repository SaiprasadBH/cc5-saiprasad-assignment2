import { describe, test, expect } from "vitest";
import {
  generateFibonacciIterative,
  generateFibonacciRecursive,
} from "./fibSeries";

describe("Fibonacci Series Generation", () => {
  describe("Iterative Approach", () => {
    test("should return an empty array for n = 0", () => {
      expect(generateFibonacciIterative(0)).toEqual([]);
    });

    test("should return [0, 1, 1, 2, 3] for n = 5", () => {
      expect(generateFibonacciIterative(5)).toEqual([0, 1, 1, 2, 3]);
    });
  });

  describe("Recursive Approach", () => {
    test("should return an empty array for n = 0", () => {
      expect(generateFibonacciRecursive(0)).toEqual([]);
    });
  });

  test("should return [0, 1, 1, 2, 3] for n = 5", () => {
    expect(generateFibonacciRecursive(5)).toEqual([0, 1, 1, 2, 3]);
  });
});
