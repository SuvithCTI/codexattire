/**
 * Formats a numeric price into INR currency string with ₹ symbol
 * e.g. 1299 -> "₹1,299"
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `₹${numeric.toLocaleString('en-IN')}`;
};

export default formatPrice;
