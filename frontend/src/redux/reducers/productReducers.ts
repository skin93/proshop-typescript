import { Reducer } from 'redux'
import {
  ProductActions,
  ProductActionTypes,
  IProductCreateState,
  IProductDeleteState,
  IProductDetailsState,
  IProductListState,
  IProductCreateReviewState,
  IProductTopState,
  IProductUpdateState
} from '../types/productTypes'

const initialProductListState: IProductListState = {
  products: [],
  loading: false,
  error: '',
  pages: 0,
  page: 0
}

export const productListReducer: Reducer<IProductListState, ProductActions> = (
  state = initialProductListState,
  action
) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        error: '',
        loading: true
      }
    case ProductActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        products: action.payload?.products,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case ProductActionTypes.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const initialProductDetailsState: IProductDetailsState = {
  product: null,
  loading: false,
  error: ''
}

export const productDetailsReducer: Reducer<
  IProductDetailsState,
  ProductActions
> = (state = initialProductDetailsState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case ProductActionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: ''
      }
    case ProductActionTypes.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        product: null,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const initialProductDeleteState: IProductDeleteState = {
  error: '',
  loading: false,
  success: false
}

export const productDeleteReducer: Reducer<
  IProductDeleteState,
  ProductActions
> = (state = initialProductDeleteState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case ProductActionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true
      }
    case ProductActionTypes.PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      }
    default:
      return state
  }
}

const initialProductCreateState: IProductCreateState = {
  product: null,
  error: '',
  loading: false,
  success: false
}

export const productCreateReducer: Reducer<
  IProductCreateState,
  ProductActions
> = (state = initialProductCreateState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case ProductActionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
        product: action.payload
      }
    case ProductActionTypes.PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ProductActionTypes.PRODUCT_CREATE_RESET:
      return initialProductCreateState
    default:
      return state
  }
}

const initialProductUpdateState: IProductUpdateState = {
  product: null,
  error: '',
  loading: false,
  success: false
}

export const productUpdateReducer: Reducer<
  IProductUpdateState,
  ProductActions
> = (state = initialProductUpdateState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ProductActionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload
      }
    case ProductActionTypes.PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ProductActionTypes.PRODUCT_CREATE_RESET:
      return initialProductUpdateState
    default:
      return state
  }
}

const initialProductCreateReviewState: IProductCreateReviewState = {
  error: '',
  loading: false,
  success: false
}

export const productCreateReviewReducer: Reducer<
  IProductCreateReviewState,
  ProductActions
> = (state = initialProductCreateReviewState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET:
      return initialProductCreateReviewState
    default:
      return state
  }
}

const initialProductTopState: IProductTopState = {
  error: '',
  loading: false,
  products: []
}

export const productTopRatedReducer: Reducer<
  IProductTopState,
  ProductActions
> = (state = initialProductTopState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_TOP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ProductActionTypes.PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case ProductActionTypes.PRODUCT_TOP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
