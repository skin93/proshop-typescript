export enum UserActionTypes {
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT',

  USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAIL = 'USER_REGISTER_FAIL',

  USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST',
  USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS',
  USER_DETAILS_FAIL = 'USER_DETAILS_FAIL',
  USER_DETAILS_RESET = 'USER_DETAILS_RESET',

  USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST',
  USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS',
  USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL',
  USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET',

  USER_LIST_REQUEST = 'USER_LIST_REQUEST',
  USER_LIST_SUCCESS = 'USER_LIST_SUCCESS',
  USER_LIST_FAIL = 'USER_LIST_FAIL',
  USER_LIST_RESET = 'USER_LIST_RESET',

  USER_DELETE_REQUEST = 'USER_DELETE_REQUEST',
  USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS',
  USER_DELETE_FAIL = 'USER_DELETE_FAIL',

  USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS',
  USER_UPDATE_FAIL = 'USER_UPDATE_FAIL',
  USER_UPDATE_RESET = 'USER_UPDATE_RESET'
}

export interface IUser {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: string
}

export interface IUserLoginRequest {
  type: typeof UserActionTypes.USER_LOGIN_REQUEST
}

export interface IUserLoginSuccess {
  type: typeof UserActionTypes.USER_LOGIN_SUCCESS
  payload: IUser
}

export interface IUserLoginFail {
  type: typeof UserActionTypes.USER_LOGIN_FAIL
  payload: string
}

export interface IUserLogout {
  type: typeof UserActionTypes.USER_LOGOUT
}

export interface IUserRegisterRequest {
  type: typeof UserActionTypes.USER_REGISTER_REQUEST
}

export interface IUserRegisterSuccess {
  type: typeof UserActionTypes.USER_REGISTER_SUCCESS
  payload: IUser
}

export interface IUserRegisterFail {
  type: typeof UserActionTypes.USER_REGISTER_FAIL
  payload: string
}

export interface IUserDetailsRequest {
  type: typeof UserActionTypes.USER_DETAILS_REQUEST
}

export interface IUserDetailsSuccess {
  type: typeof UserActionTypes.USER_DETAILS_SUCCESS
  payload: IUser
}

export interface IUserDetailsFail {
  type: typeof UserActionTypes.USER_DETAILS_FAIL
  payload: string
}

export interface IUserDetailsReset {
  type: typeof UserActionTypes.USER_DETAILS_RESET
}

export interface IUserUpdateProfileRequest {
  type: typeof UserActionTypes.USER_UPDATE_PROFILE_REQUEST
}

export interface IUserUpdateProfileSuccess {
  type: typeof UserActionTypes.USER_UPDATE_PROFILE_SUCCESS
  payload: IUser
}

export interface IUserUpdateProfileFail {
  type: typeof UserActionTypes.USER_UPDATE_PROFILE_FAIL
  payload: string
}

export interface IUserUpdateProfileReset {
  type: typeof UserActionTypes.USER_UPDATE_PROFILE_RESET
}

export interface IUserListRequest {
  type: typeof UserActionTypes.USER_LIST_REQUEST
}

export interface IUserListSuccess {
  type: typeof UserActionTypes.USER_LIST_SUCCESS
  payload: IUser[]
}

export interface IUserListFail {
  type: typeof UserActionTypes.USER_LIST_FAIL
  payload: string
}

export interface IUserListReset {
  type: typeof UserActionTypes.USER_LIST_RESET
}

export interface IUserDeleteRequest {
  type: typeof UserActionTypes.USER_DELETE_REQUEST
}

export interface IUserDeleteSuccess {
  type: typeof UserActionTypes.USER_DELETE_SUCCESS
}

export interface IUserDeleteFail {
  type: typeof UserActionTypes.USER_DELETE_FAIL
  payload: string
}

export interface IUserUpdateRequest {
  type: typeof UserActionTypes.USER_UPDATE_REQUEST
}

export interface IUserUpdateSuccess {
  type: typeof UserActionTypes.USER_UPDATE_SUCCESS
}

export interface IUserUpdateFail {
  type: typeof UserActionTypes.USER_UPDATE_FAIL
  payload: string
}

export interface IUserUpdateReset {
  type: typeof UserActionTypes.USER_UPDATE_RESET
}

export type UserActions =
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserLogout
  | IUserRegisterRequest
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserDetailsRequest
  | IUserDetailsSuccess
  | IUserDetailsFail
  | IUserDetailsReset
  | IUserUpdateProfileRequest
  | IUserUpdateProfileSuccess
  | IUserUpdateProfileFail
  | IUserUpdateProfileReset
  | IUserListRequest
  | IUserListSuccess
  | IUserListFail
  | IUserListReset
  | IUserDeleteRequest
  | IUserDeleteSuccess
  | IUserDeleteFail
  | IUserUpdateRequest
  | IUserUpdateSuccess
  | IUserUpdateFail
  | IUserUpdateReset

export interface IUserLoginState {
  loading: boolean
  userInfo: IUser | null
  error: string
}

export interface IUserRegisterState {
  loading: boolean
  userInfo: IUser | null
  error: string
}

export interface IUserDetailsState {
  loading: boolean
  user: IUser | null
  error: string
}

export interface IUserUpdateProfileState {
  loading: boolean
  userInfo: IUser | null
  error: string
  success: boolean
}

export interface IUserListState {
  loading: boolean
  users: IUser[]
  error: string
}

export interface IUserDeleteState {
  loading: boolean
  error: string
  success: boolean
}

export interface IUserUpdateState {
  loading: boolean
  user: IUser | null
  error: string
  success: boolean
}
