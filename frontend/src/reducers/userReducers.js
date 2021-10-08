import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { isLoading: true };
    case USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { isLoading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { isLoading: true };
    case USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, isLoading: true };
    case USER_PROFILE_SUCCESS:
      return { isLoading: false, user: action.payload };
    case USER_PROFILE_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { isLoading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, success: true, userInfo: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { isLoading: false, error: action.payload };
    case UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROFILE_REQUEST:
      return { isLoading: true };
    case DELETE_PROFILE_SUCCESS:
      return { isLoading: false, deleteSuccess: true };
    case DELETE_PROFILE_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
