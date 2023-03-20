import React from "react";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REQUEST_lOGIN,
  REQUEST_REGISTER,
  USER_UPDATE
} from "./actions.js";

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
let isAuthenticateds = localStorage.getItem("isAuthenticated")
  ? JSON.parse(localStorage.getItem("isAuthenticated"))
  : false;
export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  loading_registers: false,
  isAuthenticated: isAuthenticateds,
  errorMessage: null,
  register: false,
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
      return {
        ...state,
        loading_registers: true,
        register: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading_registers: false,
        register: true,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading_registers: false,
        errorMessage: action.error,
      };
    case REQUEST_lOGIN:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        isAuthenticated: false,
      };
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: "",
        token: "",
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
