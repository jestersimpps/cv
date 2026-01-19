export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 10000) {
    // Show one decimal place for numbers between 1k and 10k (e.g., 1.2k, 9.9k)
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }

  if (num < 1000000) {
    // No decimal place for numbers 10k and above (e.g., 10k, 999k)
    return Math.round(num / 1000) + 'k';
  }

  // For millions
  return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
}

export function formatViewCount(count: number): string {
  if (count === 0) {
    return '0 views';
  }

  if (count === 1) {
    return '1 view';
  }

  return `${formatNumber(count)} views`;
}
