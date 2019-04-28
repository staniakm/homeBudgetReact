const budgetReducer = (state = {
    budgetData: {
        budgets: []
    }
}, action) => {
    console.log('reducer', action)
    switch (action.type) {
        case 'SET_BUDGET':
            return {
                ...state,
                budgetData: action.budgetData
            }
        default:
            return state;
    }
}

export default budgetReducer