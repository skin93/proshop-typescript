import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'
import {
  ProductActions,
  ProductActionTypes,
  IReview,
  IServerProduct,
  IProduct
} from '../types/productTypes'
import { IApplicationState } from '../reducers/rootReducer'

export const listProducts: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, ProductActions>
> = (keywords: string = '', pageNumber: string = '') => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_REQUEST
    })

    const { data } = await axios.get<IServerProduct>(
      `/api/products?keywords=${keywords}&pageNumber=${pageNumber}`
    )
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const listProductDetails: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, ProductActions>
> = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_REQUEST
    })

    const { data } = await axios.get<IProduct>(`/api/products/${id}`)
    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const deleteProduct: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, ProductActions>
> = (id: string) => async (dispatch: Dispatch, getState) => {
  try {
    dispatch({
      type: ProductActionTypes.PRODUCT_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: ProductActionTypes.PRODUCT_DELETE_REQUEST
    })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: ProductActionTypes.PRODUCT_DELETE_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const createProduct: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, null, ProductActions>
> = () => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_REQUEST
    })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post<IProduct>(`api/products`, {}, config)

    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const updateProduct: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, IProduct, ProductActions>
> = (product: IProduct) => async (dispatch: Dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: ProductActionTypes.PRODUCT_UPDATE_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put<IProduct>(
      `api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: ProductActionTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const createProductReview: ActionCreator<
  ThunkAction<
    Promise<void>,
    IApplicationState,
    string & IReview,
    ProductActions
  >
> = (productId: string, review: IReview) => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const token = userInfo ? userInfo.token : ''

    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    await axios.post(`api/products/${productId}/reviews`, review, config)

    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const listTopProducts: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, null, ProductActions>
> = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: ProductActionTypes.PRODUCT_TOP_REQUEST
    })

    const { data } = await axios.get<IProduct[]>(`/api/products/top`)

    dispatch({
      type: ProductActionTypes.PRODUCT_TOP_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ProductActionTypes.PRODUCT_TOP_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}
