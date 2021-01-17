export enum ProductActionTypes {
  PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
  PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
  PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL',

  PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST',
  PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS',
  PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL',

  PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST',
  PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS',
  PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL',

  PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST',
  PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS',
  PRODUCT_CREATE_FAIL = 'PRODUCT_CREATE_FAIL',
  PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET',

  PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST',
  PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS',
  PRODUCT_UPDATE_FAIL = 'PRODUCT_UPDATE_FAIL',
  PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET',

  PRODUCT_CREATE_REVIEW_REQUEST = 'PRODUCT_CREATE_REVIEW_REQUEST',
  PRODUCT_CREATE_REVIEW_SUCCESS = 'PRODUCT_CREATE_REVIEW_SUCCESS',
  PRODUCT_CREATE_REVIEW_FAIL = 'PRODUCT_CREATE_REVIEW_FAIL',
  PRODUCT_CREATE_REVIEW_RESET = 'PRODUCT_CREATE_REVIEW_RESET',

  PRODUCT_TOP_REQUEST = 'PRODUCT_TOP_REQUEST',
  PRODUCT_TOP_SUCCESS = 'PRODUCT_TOP_SUCCESS',
  PRODUCT_TOP_FAIL = 'PRODUCT_TOP_FAIL'
}

export interface IProduct {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  reviews?: IReview[]
}

export interface IReview {
  _id?: string
  name?: string
  createdAt?: Date
  rating: number
  comment: string
}

export interface IServerProduct {
  products: IProduct[]
  page: number
  pages: number
}

export interface IProductListRequest {
  type: ProductActionTypes.PRODUCT_LIST_REQUEST
}

export interface IProductListSuccess {
  type: ProductActionTypes.PRODUCT_LIST_SUCCESS
  payload: IServerProduct
}

export interface IProductListFail {
  type: ProductActionTypes.PRODUCT_LIST_FAIL
  payload: string
}

export interface IProductDetailsRequest {
  type: ProductActionTypes.PRODUCT_DETAILS_REQUEST
}

export interface IProductDetailsSuccess {
  type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS
  payload: IProduct | null
}

export interface IProductDetailsFail {
  type: ProductActionTypes.PRODUCT_DETAILS_FAIL
  payload: string
}

export interface IProductDeleteRequest {
  type: ProductActionTypes.PRODUCT_DELETE_REQUEST
}

export interface IProductDeleteSuccess {
  type: ProductActionTypes.PRODUCT_DELETE_SUCCESS
}

export interface IProductDeleteFail {
  type: ProductActionTypes.PRODUCT_DELETE_FAIL
  payload: string
}

export interface IProductCreateRequest {
  type: ProductActionTypes.PRODUCT_CREATE_REQUEST
}

export interface IProductCreateSuccess {
  type: ProductActionTypes.PRODUCT_CREATE_SUCCESS
  payload: IProduct
}

export interface IProductCreateFail {
  type: ProductActionTypes.PRODUCT_CREATE_FAIL
  payload: string
}

export interface IProductCreateReset {
  type: ProductActionTypes.PRODUCT_CREATE_RESET
}

export interface IProductUpdateRequest {
  type: ProductActionTypes.PRODUCT_UPDATE_REQUEST
}

export interface IProductUpdateSuccess {
  type: ProductActionTypes.PRODUCT_UPDATE_SUCCESS
  payload: IProduct
}

export interface IProductUpdateFail {
  type: ProductActionTypes.PRODUCT_UPDATE_FAIL
  payload: string
}

export interface IProductUpdateReset {
  type: ProductActionTypes.PRODUCT_UPDATE_RESET
}

export interface IProductCreateReviewRequest {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST
}

export interface IProductCreateReviewSuccess {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS
}

export interface IProductCreateReviewFail {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_FAIL
  payload: string
}

export interface IProductCreateReviewReset {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET
}

export interface IProductUpdateSuccess {
  type: ProductActionTypes.PRODUCT_UPDATE_SUCCESS
}

export interface IProductTopRequest {
  type: ProductActionTypes.PRODUCT_TOP_REQUEST
}

export interface IProductTopSuccess {
  type: ProductActionTypes.PRODUCT_TOP_SUCCESS
  payload: IProduct[]
}

export interface IProductTopFail {
  type: ProductActionTypes.PRODUCT_TOP_FAIL
  payload: string
}

export type ProductActions =
  | IProductListRequest
  | IProductListSuccess
  | IProductListFail
  | IProductDetailsRequest
  | IProductDetailsSuccess
  | IProductDetailsFail
  | IProductDeleteRequest
  | IProductDeleteSuccess
  | IProductDeleteFail
  | IProductCreateRequest
  | IProductCreateSuccess
  | IProductCreateFail
  | IProductCreateReset
  | IProductUpdateRequest
  | IProductUpdateSuccess
  | IProductUpdateFail
  | IProductUpdateReset
  | IProductCreateReviewRequest
  | IProductCreateReviewSuccess
  | IProductCreateReviewFail
  | IProductCreateReviewReset
  | IProductTopRequest
  | IProductTopSuccess
  | IProductTopFail

export interface IProductListState {
  products: IProduct[]
  loading: boolean
  error: string
  page: number
  pages: number
}

export interface IProductDetailsState {
  product: IProduct | null
  loading: boolean
  error: string
}

export interface IProductDeleteState {
  loading: boolean
  error: string
  success: boolean
}

export interface IProductCreateState {
  loading: boolean
  error: string
  success: boolean
  product: IProduct | null
}

export interface IProductUpdateState {
  loading: boolean
  error: string
  success: boolean
  product: IProduct | null
}

export interface IProductCreateReviewState {
  loading: boolean
  success: boolean
  error: string
}

export interface IProductTopState {
  loading: boolean
  products: IProduct[]
  error: string
}
