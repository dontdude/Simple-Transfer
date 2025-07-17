/**
 * Formats a string or number into a generic Dollar currency string (e.g., "$1,000.00").
 * @param amount The amount to format.
 * @returns A string formatted with a dollar sign.
 */
export const formatCurrency = (amount: string | number): string => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
        return '$0.00';
    }

    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(numericAmount);

    // Replace full currency symbol with generic $
    return formatted.replace(/[^0-9.,-]+/, '$');
};
