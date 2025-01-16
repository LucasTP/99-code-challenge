export const formatCurrency = (currency: number) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 20,
  }).format(currency);
