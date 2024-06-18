export const formatNumber = (num) => {
  if (num === null) {
    return null;
  }
  // Convert num to a number if it's a string that looks like a number
  if (typeof num === 'string') {
    num = parseFloat(num);
  }

  // Check if num is a valid number or float
  if (typeof num !== 'number' || isNaN(num)) {
    console.error('Invalid number provided to formatNumber:', num);
    return NaN;
  }

  // Round to 2 decimal places and convert to a float
  const formattedNumber = parseFloat(num.toFixed(2));

  return formattedNumber;
};
