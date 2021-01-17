import { combineReducers } from 'redux'
import { ICartState } from '../types/cartTypes'
import {
  IOrderCreateState,
  IOrderDeliverState,
  IOrderDetailsState,
  IOrderListMyState,
  IOrderListState,
  IOrderPayState
} from '../types/orderTypes'
import {
  IProductCreateReviewState,
  IProductCreateState,
  IProductDeleteState,
  IProductDetailsState,
  IProductListState,
  IProductTopState,
  IProductUpdateState
} from '../types/productTypes'
import {
  IUserDeleteState,
  IUserDetailsState,
  IUserListState,
  IUserLoginState,
  IUserRegisterState,
  IUserUpdateProfileState,
  IUserUpdateState
} from '../types/userTypes'

import { cartReducer } from './cartReducers'
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer
} from './orderReducers'

import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productTopRatedReducer,
  productUpdateReducer
} from './productReducers'

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from './userReducers'

export interface IApplicationState {
  productList: IProductListState
  productDetails: IProductDetailsState
  productCreate: IProductCreateState
  productUpdate: IProductUpdateState
  productCreateReview: IProductCreateReviewState
  productTopRated: IProductTopState
  productDelete: IProductDeleteState
  cart: ICartState
  userLogin: IUserLoginState
  userRegister: IUserRegisterState
  userDetails: IUserDetailsState
  userUpdateProfile: IUserUpdateProfileState
  userList: IUserListState
  userDelete: IUserDeleteState
  userUpdate: IUserUpdateState
  orderCreate: IOrderCreateState
  orderDetails: IOrderDetailsState
  orderPay: IOrderPayState
  orderDeliver: IOrderDeliverState
  orderList: IOrderListState
  orderListMy: IOrderListMyState
}

const rootReducer = combineReducers<IApplicationState>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer
})

export default rootReducer
