import { ICartAddress, ICartItem } from './cartTypes'

export enum OrderActionTypes {
  ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST',
  ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS',
  ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL',

  ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST',
  ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS',
  ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL',

  ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST',
  ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS',
  ORDER_PAY_FAIL = 'ORDER_PAY_FAIL',
  ORDER_PAY_RESET = 'ORDER_PAY_RESET',

  ORDER_LIST_MY_REQUEST = 'ORDER_LIST_MY_REQUEST',
  ORDER_LIST_MY_SUCCESS = 'ORDER_LIST_MY_SUCCESS',
  ORDER_LIST_MY_FAIL = 'ORDER_LIST_MY_FAIL',
  ORDER_LIST_MY_RESET = 'ORDER_LIST_MY_RESET',

  ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST',
  ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS',
  ORDER_LIST_FAIL = 'ORDER_LIST_FAIL',

  ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST',
  ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS',
  ORDER_DELIVER_FAIL = 'ORDER_DELIVER_FAIL',
  ORDER_DELIVER_RESET = 'ORDER_DELIVER_RESET'
}

export interface IPaymentResult {
  id?: string
  status?: string
  update_item?: Date
  email_address: string
  create_time?: Date
  payer?: {
    email_address: string
  }
  intent?: string
}

export interface IOrder {
  _id?: string
  orderItems: ICartItem[]
  isPaid?: boolean
  paidAt?: Date
  isDelivered?: boolean
  deliveredAt?: Date
  paymentResult?: IPaymentResult
  shippingAddress: ICartAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  createdAt?: Date
  user?: {
    name: string
    email: string
  }
}

export interface IOrderCreateRequest {
  type: typeof OrderActionTypes.ORDER_CREATE_REQUEST
}

export interface IOrderCreateSuccess {
  type: typeof OrderActionTypes.ORDER_CREATE_SUCCESS
  payload: IOrder
}

export interface IOrderCreateFail {
  type: typeof OrderActionTypes.ORDER_CREATE_FAIL
  payload: string
}

export interface IOrderDetailsRequest {
  type: typeof OrderActionTypes.ORDER_DETAILS_REQUEST
}

export interface IOrderDetailsSuccess {
  type: typeof OrderActionTypes.ORDER_DETAILS_SUCCESS
  payload: IOrder
}

export interface IOrderDetailsFail {
  type: typeof OrderActionTypes.ORDER_DETAILS_FAIL
  payload: string
}

export interface IOrderPayRequest {
  type: typeof OrderActionTypes.ORDER_PAY_REQUEST
}

export interface IOrderPaySuccess {
  type: typeof OrderActionTypes.ORDER_PAY_SUCCESS
  payload: IOrder
}

export interface IOrderPayFail {
  type: typeof OrderActionTypes.ORDER_PAY_FAIL
  payload: string
}

export interface IOrderPayReset {
  type: typeof OrderActionTypes.ORDER_PAY_RESET
}

export interface IOrderListMyRequest {
  type: typeof OrderActionTypes.ORDER_LIST_MY_REQUEST
}

export interface IOrderListMySuccess {
  type: typeof OrderActionTypes.ORDER_LIST_MY_SUCCESS
  payload: IOrder
}

export interface IOrderListMyFail {
  type: typeof OrderActionTypes.ORDER_LIST_MY_FAIL
  payload: string
}

export interface IOrderListMyReset {
  type: typeof OrderActionTypes.ORDER_LIST_MY_RESET
}

export interface IOrderListRequest {
  type: typeof OrderActionTypes.ORDER_LIST_REQUEST
}

export interface IOrderListSuccess {
  type: typeof OrderActionTypes.ORDER_LIST_SUCCESS
  payload: IOrder[]
}

export interface IOrderListFail {
  type: typeof OrderActionTypes.ORDER_LIST_FAIL
  payload: string
}

export interface IOrderDeliverRequest {
  type: typeof OrderActionTypes.ORDER_DELIVER_REQUEST
}

export interface IOrderDeliverSuccess {
  type: typeof OrderActionTypes.ORDER_DELIVER_SUCCESS
  payload: IOrder
}

export interface IOrderDeliverFail {
  type: typeof OrderActionTypes.ORDER_DELIVER_FAIL
  payload: string
}

export interface IOrderDeliverReset {
  type: typeof OrderActionTypes.ORDER_DELIVER_RESET
}

export type OrderActions =
  | IOrderCreateRequest
  | IOrderCreateSuccess
  | IOrderCreateFail
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFail
  | IOrderPayRequest
  | IOrderPaySuccess
  | IOrderPayFail
  | IOrderPayReset
  | IOrderListMyRequest
  | IOrderListMySuccess
  | IOrderListMyFail
  | IOrderListMyReset
  | IOrderListRequest
  | IOrderListSuccess
  | IOrderListFail
  | IOrderDeliverRequest
  | IOrderDeliverSuccess
  | IOrderDeliverFail
  | IOrderDeliverReset

export interface IOrderCreateState {
  loading: boolean
  success: boolean
  order: IOrder
  error: string
}

export interface IOrderDetailsState {
  orderItems: IOrder[]
  shippingAddress: ICartAddress
  order: IOrder | null
  error: string
  loading: boolean
}

export interface IOrderPayState {
  loading?: boolean
  success?: boolean
  error?: string
}

export interface IOrderListMyState {
  orders: IOrder[]
  loading: boolean
  error: string
}

export interface IOrderListState {
  orders: IOrder[]
  loading: boolean
  error: string
}

export interface IOrderDeliverState {
  loading: boolean
  success: boolean
  error: string
}
