import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM, CART_VALIDATION_MESSAGE, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems:[], shippingAddress:{}, message:'' }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(cartItem => cartItem.productId === item.productId) //check if the item to be updated are already in the cart
            const qtyToBeAdded = item.qty
            let alert = ''

            if(existItem){
                // update the qty of the item, if desired qty > countInStock, then set to countInStock
                const qtyFinal = (qtyToBeAdded + existItem.qty) > item.countInStock ? item.countInStock : (qtyToBeAdded + existItem.qty)
                item.qty = qtyFinal
                alert += (qtyToBeAdded + existItem.qty) > item.countInStock && item.countInStock - existItem.qty >= 1 ? `Added ${item.countInStock - existItem.qty} of '${item.name}' to cart, ` : ''
                alert += (qtyToBeAdded + existItem.qty) > item.countInStock ? `Sorry, we do not have enough item in stock to fulfill your demand. `
                            : `Added ${qtyToBeAdded} of '${item.name}' to cart`

                return{
                    ...state,
                    cartItems: state.cartItems.map(cartItem => 
                            cartItem.productId === existItem.productId ? item : cartItem //replace the cartItem with the new Item, which has an updated qty
                        ),
                    message: alert
                }
            }else{
                alert = `Added ${item.qty} of '${item.name}' to cart` //Successfully added to cart
                return{
                    ...state,
                    cartItems:[...state.cartItems, item],
                    message: alert
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
                    cartItems: state.cartItems.map(cartItem => (
                            cartItem.productId === upExistItem.productId ? upItem : cartItem //replace the cartItem with the new Item, which has an updated qty
                        )),
                    message: '',
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems],
                    message: '',
                }
            }

        case CART_VALIDATION_MESSAGE:
            return {
                ...state,
                message: action.payload
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        default:
            return {...state, message: ''}
    }
}