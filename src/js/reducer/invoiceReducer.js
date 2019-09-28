const invoiceReducer = (state = { product: '' }, action) => {
    switch (action.type) {
        case 'FETCH_INVOICES':
            return [
                ...action.invoices
            ]
        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.product
            }
        default:
            return state;
    }
}

export default invoiceReducer