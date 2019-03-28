export const invoiceFetched = (invoices) => ({
    type: 'FETCH_INVOICES', 
    invoices
});

export const setMonth = (month) => ({
    type: 'MONTH',
    month
})