export enum CartActionTypes {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
  CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS',
  CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD'
}

export interface ICartItem {
  product: string
  name: string
  image: string
  price: number
  countInStock: number
  qty: number
}

export interface ICartAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface ICartAddItem {
  type: typeof CartActionTypes.CART_ADD_ITEM
  payload: ICartItem
}

export interface ICartRemoveItem {
  type: typeof CartActionTypes.CART_REMOVE_ITEM
  payload: string
}

export interface ICartSaveShippingAddress {
  type: typeof CartActionTypes.CART_SAVE_SHIPPING_ADDRESS
  payload: ICartAddress
}

export interface ICartSavePaymentMethod {
  type: typeof CartActionTypes.CART_SAVE_PAYMENT_METHOD
  payload: string
}

export type CartActions =
  | ICartAddItem
  | ICartRemoveItem
  | ICartSaveShippingAddress
  | ICartSavePaymentMethod

export interface ICartState {
  cartItems: ICartItem[]
  shippingAddress: ICartAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}
