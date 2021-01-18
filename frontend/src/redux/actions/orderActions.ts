import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IApplicationState } from '../reducers/rootReducer'
import {
  OrderActions,
  OrderActionTypes,
  IOrder,
  IPaymentResult
} from '../types/orderTypes'
import axios from 'axios'

export const createOrder: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, IOrder, OrderActions>
> = (order: IOrder) => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: OrderActionTypes.ORDER_CREATE_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: OrderActionTypes.ORDER_CREATE_SUCCESS,
      payload: data.createOrder
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getOrderDetails: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, OrderActions>
> = (id: string) => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: OrderActionTypes.ORDER_DETAILS_REQUEST
    })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get<IOrder>(`/api/orders/${id}`, config)

    dispatch({
      type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const payOrder: ActionCreator<
  ThunkAction<
    Promise<void>,
    IApplicationState,
    string & IPaymentResult,
    OrderActions
  >
> = (orderId: string, paymentResult: IPaymentResult) => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: OrderActionTypes.ORDER_PAY_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put<IOrder>(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: OrderActionTypes.ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listMyOrders: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, null, OrderActions>
> = () => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: OrderActionTypes.ORDER_LIST_MY_REQUEST
    })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get<IOrder[]>(`/api/orders/myorders`, config)

    dispatch({
      type: OrderActionTypes.ORDER_LIST_MY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listOrders: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, null, OrderActions>
> = () => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: OrderActionTypes.ORDER_LIST_REQUEST
    })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get<IOrder[]>(`/api/orders`, config)

    dispatch({
      type: OrderActionTypes.ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deliverOrder: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, IOrder, OrderActions>
> = (order: IOrder) => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: OrderActionTypes.ORDER_DELIVER_REQUEST
    })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put<IOrder>(
      `/api/orders/${order._id}/deliver`,
      config
    )

    dispatch({
      type: OrderActionTypes.ORDER_DELIVER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
