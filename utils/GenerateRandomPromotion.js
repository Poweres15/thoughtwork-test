export function generatePromitionFromFirstDigit(number) {
  const lastDigit = typeof number !== "number" ? 1 : (number + 1 + 1) % 10;
  const discountPercentage =
    typeof number !== "number" ? "00%" : `${number * 10}%`;

  return {
    code: `AA${number}-AAA-11${lastDigit}`,
    discountPercentage,
  };
}
