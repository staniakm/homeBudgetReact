import moment from 'moment'
const setDate = date => {
    return moment(new Date()).add(date, 'month').format("YYYY-MM")
}

const monthReducer = (state =
    {
        month: 0,
        monthValue: setDate(0)
    }
    , action) => {
    switch (action.type) {
        case 'MONTH': {
            return {
                ...state,
                month: action.month,
                monthValue: setDate(action.month)
            }
        }

        default: {
            return state
        }
    }
}

export default monthReducer