import { Reducer } from 'redux'
import {
  UserActions,
  UserActionTypes,
  IUserLoginState,
  IUserRegisterState,
  IUserListState,
  IUserDeleteState,
  IUserDetailsState,
  IUserUpdateProfileState,
  IUserUpdateState
} from '../types/userTypes'

const initialUserLoginState: IUserLoginState = {
  error: '',
  loading: false,
  userInfo: null
}

export const userLoginReducer: Reducer<IUserLoginState, UserActions> = (
  state = initialUserLoginState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        userInfo: action.payload
      }

    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UserActionTypes.USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userInfo: null
      }
    default:
      return state
  }
}

const initialUserRegisterState: IUserRegisterState = {
  error: '',
  loading: false,
  userInfo: null
}

export const userRegisterReducer: Reducer<IUserRegisterState, UserActions> = (
  state = initialUserRegisterState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        userInfo: action.payload
      }

    case UserActionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const initialUserDetailsState: IUserDetailsState = {
  loading: false,
  error: '',
  user: null
}

export const userDetailsReducer: Reducer<IUserDetailsState, UserActions> = (
  state = initialUserDetailsState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }

    case UserActionTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UserActionTypes.USER_DETAILS_RESET:
      return initialUserDetailsState
    default:
      return state
  }
}

const initialUserUpdateProfileState: IUserUpdateProfileState = {
  error: '',
  loading: false,
  success: false,
  userInfo: null
}

export const userUpdateProfileReducer: Reducer<
  IUserUpdateProfileState,
  UserActions
> = (state = initialUserUpdateProfileState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: ''
      }
    case UserActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        userInfo: action.payload
      }

    case UserActionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    default:
      return state
  }
}

const initialUserListState: IUserListState = {
  error: '',
  loading: false,
  users: []
}

export const userListReducer: Reducer<IUserListState, UserActions> = (
  state = initialUserListState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }

    case UserActionTypes.USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UserActionTypes.USER_LIST_RESET:
      return initialUserListState
    default:
      return state
  }
}

const initialUserDeleteState: IUserDeleteState = {
  error: '',
  loading: false,
  success: false
}

export const userDeleteReducer: Reducer<IUserDeleteState, UserActions> = (
  state = initialUserDeleteState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }

    case UserActionTypes.USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const initialUserUpdateState: IUserUpdateState = {
  error: '',
  loading: false,
  success: false,
  user: null
}

export const userUpdateReducer: Reducer<IUserUpdateState, UserActions> = (
  state = initialUserUpdateState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }

    case UserActionTypes.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UserActionTypes.USER_UPDATE_RESET:
      return {
        ...state,
        success: false,
        user: null
      }
    default:
      return state
  }
}
