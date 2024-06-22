/**
 * Interface defining expectations for a value of type T.
 */
interface Expect<T> {
  toBe: (expected: T) => void; // Method to assert that the value is exactly equal to expected
  not: {
    // Sub-interface for negated assertions
    toBe: (expected: T) => void; // Method to assert that the value is not equal to expected
  };
}

/**
 * Creates an expectation object for a given value.
 * @param value The value to create an expectation for.
 * @returns An object with methods to assert expectations on the value.
 */
export function expect<T>(value: T): Expect<T> {
  return {
    toBe: (expected: T) => {
      // Asserts that the value is exactly equal to expected
      if (value !== expected) {
        throw new Error(`Expected ${value} to be ${expected}`);
      }
    },
    not: {
      toBe: (expected: T) => {
        // Asserts that the value is not equal to expected
        if (value === expected) {
          throw new Error(`Expected ${value} not to be ${expected}`);
        }
      },
    },
  };
}
