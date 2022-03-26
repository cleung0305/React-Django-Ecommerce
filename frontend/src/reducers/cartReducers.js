import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(cartItem => cartItem.product === item.product) //check if the item to be updated are already in the cart

            if(existItem){
                item.qty = item.qty + existItem.qty // update the qty of the item
                return{
                    ...state,
                    cartItems: state.cartItems.map(cartItem => 
                            cartItem.product === existItem.product ? item : cartItem //replace the cartItem with the new Item, which has an updated qty
                        )
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        default:
            return state
    }
}