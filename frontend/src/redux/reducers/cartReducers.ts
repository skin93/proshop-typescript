import { Reducer } from 'redux'
import { CartActions, CartActionTypes, ICartState } from '../types/cartTypes'

const initialCartState: ICartState = {
  cartItems: [],
  itemsPrice: 0,
  paymentMethod: '',
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: {
    address: '',
    city: '',
    country: '',
    postalCode: ''
  }
}

export const cartReducer: Reducer<ICartState, CartActions> = (
  state = initialCartState,
  action
) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CartActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        )
      }
    case CartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case CartActionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    default:
      return state
  }
}
