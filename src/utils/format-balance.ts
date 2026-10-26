export const fBalance = (balance: number | string) => {
    return Number(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatMoney = (currencyCode: string, amount: number): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    });

    // The `format` method returns a string like "$1.00" or "€1.00" so we extract the symbol.
    return formatter.format(amount); // Directly format the amount with the currency symbol
};
