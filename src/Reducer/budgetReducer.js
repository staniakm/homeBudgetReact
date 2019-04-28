const budgetReducer = (state = {
    budgetData: {
        budgets: []
    }
}, action) => {
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