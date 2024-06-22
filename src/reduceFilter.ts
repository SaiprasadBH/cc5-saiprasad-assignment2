/**
 * Reduces an array to a single value using a custom reducer function.
 * @template T - The type of elements in the array.
 * @template U - The type of the accumulator and the return value.
 * @param {T[]} array - The array to be reduced.
 * @param {(accumulator: U, currentValue: T, index: number, array: T[]) => U} reducer - The reducer function.
 * @param {U} initialValue - The initial value of the accumulator.
 * @returns {U} - The accumulated result.
 */
export function genericReduce<T, U>(
  array: T[],
  reducer: (accumulator: U, currentValue: T, index: number, array: T[]) => U,
  initialValue: U
): U {
  let accumulator = initialValue; // Initialize accumulator with the initial value.
  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array); // Apply the reducer function to each element.
  }
  return accumulator; // Return the final accumulated value.
}

/**
 * Filters elements from an array based on a predicate function.
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be filtered.
 * @param {(value: T, index: number, array: T[]) => boolean} predicate - The predicate function used for filtering.
 * @returns {T[]} - The array of elements that satisfy the predicate.
 */
export function genericFilter<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  const result: T[] = []; // Initialize an empty array to store filtered elements.
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      result.push(array[i]); // Add the element to the result array if it satisfies the predicate.
    }
  }
  return result; // Return the array of filtered elements.
}
