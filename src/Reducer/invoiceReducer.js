const invoiceReducer = (state=[], action) => {
switch(action.type){
    case 'FETCH_INVOICES':
    return [
        ...action.invoices
    ]
    default:
        return state;
}
}

export default invoiceReducer