export const invoiceFetched = (invoices) => ({
    type: 'FETCH_INVOICES', 
    invoices
});

export const setMonth = (month) => ({
    type: 'MONTH',
    month
})

export const selectProduct = (product) => ({
    type: 'SET_PRODUCT',
    product
})

export const setShopItems = (shopItems) => ({
    type: 'SET_SHOP_ITEMS',
    shopItems
})