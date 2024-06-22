/**
 * Generates a Fibonacci sequence iteratively up to n numbers.
 * @param n The number of Fibonacci numbers to generate.
 * @returns An array containing the Fibonacci sequence.
 */
export function generateFibonacciIterative(n: number): number[] {
  if (n <= 0) return []; // If n is zero or negative, return an empty array
  if (n === 1) return [0]; // If n is 1, return [0] as the Fibonacci sequence

  const fibSeries: number[] = [0, 1]; // Initialize Fibonacci series with first two numbers

  // Generate Fibonacci numbers iteratively
  for (let i = 2; i < n; i++) {
    fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2]); // Calculate next Fibonacci number and push to array
  }

  return fibSeries; // Return the generated Fibonacci sequence
}

/**
 * Generates a Fibonacci sequence recursively up to n numbers.
 * @param n The number of Fibonacci numbers to generate.
 * @returns An array containing the Fibonacci sequence.
 */
export function generateFibonacciRecursive(n: number): number[] {
  // Recursive function to calculate Fibonacci number at index n
  function fib(n: number): number {
    if (n <= 1) return n; // Base cases: fib(0) = 0, fib(1) = 1
    return fib(n - 1) + fib(n - 2); // Recursive case: fib(n) = fib(n-1) + fib(n-2)
  }

  const fibSeries: number[] = [];

  // Generate Fibonacci numbers recursively up to n
  for (let i = 0; i < n; i++) {
    fibSeries.push(fib(i)); // Push each Fibonacci number to the array
  }

  return fibSeries; // Return the generated Fibonacci sequence
}
