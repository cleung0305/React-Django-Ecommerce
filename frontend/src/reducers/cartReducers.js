import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(cartItem => cartItem.productId === item.productId) //check if the item to be updated are already in the cart
            let qtyToBeAdded = item.qty
            let qtyFinal

            if(existItem){
                // update the qty of the item, if desired qty > countInStock, then set to countInStock
                qtyFinal = (qtyToBeAdded + existItem.qty) > item.countInStock ? item.countInStock : (qtyToBeAdded + existItem.qty)
                item.qty = qtyFinal
                return{
                    ...state,
                    cartItems: state.cartItems.map(cartItem => 
                            cartItem.productId === existItem.productId ? item : cartItem //replace the cartItem with the new Item, which has an updated qty
                        ),
                    message: qtyFinal === item.countInStock ? `Sorry, we do not have enough item in stock to fulfill your demand` : `Added ${qtyToBeAdded} of '${item.name}' to cart`
                }
            }else{
                qtyFinal = qtyToBeAdded
                item.qty = qtyFinal
                return{
                    ...state,
                    cartItems:[...state.cartItems, item],
                    message: `Added ${qtyToBeAdded} of '${item.name}' to cart`
                }
            }

        case CART_UPDATE_ITEM:
            const upItem = action.payload
            const upExistItem = state.cartItems.find(cartItem => cartItem.productId === upItem.productId) //check if the item to be updated are already in the cart
            if(upExistItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(cartItem => 
                            cartItem.productId === upExistItem.productId ? upItem : cartItem //replace the cartItem with the new Item, which has an updated qty
                        )
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, upItem]
                }
            }


        default:
            return {...state, message:''}
    }
}