const shopReducer = (state ={shopItems:[]} , action) => {
    switch(action.type){
        case 'SET_SHOP_ITEMS':{
            return {
                ...state,
                shopItems: action.shopItems
            }
        }
        
        default:{
            return state
        }
    }
}

export default shopReducer