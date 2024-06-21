export function generateFibonacciIterative(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const fibSeries: number[] = [0, 1];

  for (let i = 2; i < n; i++) {
    fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2]);
  }

  return fibSeries;
}

export function generateFibonacciRecursive(n: number): number[] {
  function fib(n: number): number {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }

  const fibSeries: number[] = [];

  for (let i = 0; i < n; i++) {
    fibSeries.push(fib(i));
  }

  return fibSeries;
}
