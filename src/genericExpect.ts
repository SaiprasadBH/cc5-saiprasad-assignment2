interface Expect<T> {
  toBe: (expected: T) => void;
  not: {
    toBe: (expected: T) => void;
  };
}

export function expect<T>(value: T): Expect<T> {
  return {
    toBe: (expected: T) => {
      if (value !== expected) {
        throw new Error(`Expected ${value} to be ${expected}`);
      }
    },
    not: {
      toBe: (expected: T) => {
        if (value === expected) {
          throw new Error(`Expected ${value} not to be ${expected}`);
        }
      },
    },
  };
}
