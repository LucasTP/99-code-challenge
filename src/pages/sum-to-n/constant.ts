export const iterativeCode = `
function sumToN(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  
  return sum;
}

// Time complexity: O(n)
// Space complexity: O(1)
`;

export const mathematicalFormulaCode = `
function sumToN(n) {
  return (n * (n + 1)) / 2;
}

// Time complexity: O(1)
// Space complexity: O(1)
`;

export const recursiveCode = `
function sumToN(n) {
    if (n === 1) return 1;

    return n + sumToN(n - 1);
}

// Time complexity: O(n)
// Space complexity: O(n)
`;
