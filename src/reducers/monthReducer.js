const monthReducer = (state = {month: 0}, action) => {
    switch(action.type){
        case 'MONTH':{
            return {
                ...state,
                month: action.month
            }
        }
        
        default:{
            return state
        }
    }
}

export default monthReducer