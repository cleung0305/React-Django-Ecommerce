import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(cartItem => cartItem.productId === item.productId) //check if the item to be updated are already in the cart
            const qtyToBeAdded = item.qty
            let message = ''

            if(existItem){
                // update the qty of the item, if desired qty > countInStock, then set to countInStock
                const qtyFinal = (qtyToBeAdded + existItem.qty) > item.countInStock ? item.countInStock : (qtyToBeAdded + existItem.qty)
                item.qty = qtyFinal
                message += (qtyToBeAdded + existItem.qty) > item.countInStock && item.countInStock - existItem.qty >= 1 ? `Added ${item.countInStock - existItem.qty} of '${item.name}' to cart, ` : ''
                message += (qtyToBeAdded + existItem.qty) > item.countInStock ? `Sorry, we do not have enough item in stock to fulfill your demand. `
                            : `Added ${qtyToBeAdded} of '${item.name}' to cart`

                return{
                    ...state,
                    cartItems: state.cartItems.map(cartItem => 
                            cartItem.productId === existItem.productId ? item : cartItem //replace the cartItem with the new Item, which has an updated qty
                        ),
                    message: message
                }
            }else{
                message = `Added ${item.qty} of '${item.name}' to cart` //Successfully added to cart
                return{
                    ...state,
                    cartItems:[...state.cartItems, item],
                    message: message
                }
            }

        case CART_REMOVE_ITEM:
            const itemToRemoveId = action.payload
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.productId !== itemToRemoveId)
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
                    cartItems:[...state.cartItems],
                }
            }


        default:
            return {...state, message: ''}
    }
}