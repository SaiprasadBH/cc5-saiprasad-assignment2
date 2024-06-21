export function genericReduce<T, U>(
  array: T[],
  reducer: (accumulator: U, currentValue: T, index: number, array: T[]) => U,
  initialValue: U
): U {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array);
  }
  return accumulator;
}

export function genericFilter<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
