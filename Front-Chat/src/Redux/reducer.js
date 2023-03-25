import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const local_url = import.meta.env.VITE_REACT_APP_URL_LOCAL;
import { updateUserSuccess } from "../Context/actions";
let { user } = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
export const reducerSlice = createSlice({
  name: "reducer",
  initialState: {
    islogging: false,
    users: null,
    errorMessage: null,
    searchuser: null,
    errorSearch: null,
    profile: null,
    loadingUpdate: false,
    updateUserSuccess: false,
    updateUserError: null,
    loadingDeleteCon: false,
    deleteConversationSuccess: false,
    deleteConversationError: null,
  },
  reducers: {
    RREQUEST_ALL_USER(state) {
      return { ...state, islogging: true, errorMessage: null };
    },
    GET_ALL_USERS_SUCCESS(state, action) {
      return {
        ...state,
        users: action.payload,
        islogging: false,
        errorMessage: null,
      };
    },
    GET_ALL_USERS_ERROR(state, action) {
      return { ...state, errorMessage: action.error, islogging: false };
    },
    SEARCH_USER_BY_NAME(state, action) {
      return { ...state, searchuser: action.payload, errorSearch: null };
    },
    SEARCH_USER_BY_NAME_ERROR(state, action) {
      return { ...state, searchuser: null, errorSearch: action.error };
    },
    GET_PROFILE(state, action) {
      return { ...state, profile: action.payload };
    },
    REQUEST_UPDATE(state) {
      return {
        ...state,
        loadingUpdate: true,
        updateUserSuccess: false,
        updateUserError: null,
      };
    },
    UPDATE_USER_SUCESS(state) {
      return {
        ...state,
        loadingUpdate: false,
        updateUserSuccess: true,
        updateUserError: null,
      };
    },
    UPDATE_USER_ERROR(state, action) {
      return {
        ...state,
        loadingUpdate: false,
        updateUserSuccess: false,
        updateUserError: action.payload,
      };
    },
    RESET_UPDATE(state) {
      return {
        ...state,
        loadingUpdate: false,
        updateUserSuccess: false,
        updateUserError: null,
      };
    },
    REQUEST_DELETE_CONVERSATION(state) {
      return {
        ...state,
        loadingDeleteCon: true,
        deleteConversationSuccess: false,
        deleteConversationError: null,
      };
    },
    DELETE_CONVERSATION_SUCCESS(state) {
      return {
        ...state,
        deleteConversationSuccess: true,
        loadingDeleteCon: false,
        deleteConversationError: null,
      };
    },
    DELETE_CONVERSATION_ERROR(state, action) {
      return {
        ...state,
        deleteConversationError: action.payload,
        loadingDeleteCon: false,
        deleteConversationSuccess: false,
      };
    },
  },
});
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};
export const get_all_users = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: RREQUEST_ALL_USER });
      let { user } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";
      console.log(getAuthHeaders(), "headers");
      const { data } = await axios.get(`${local_url}/user`, {
        headers: getAuthHeaders(),
      });
      if (data) {
        const filteredUsers = data.data.filter(
          (users) => users && users.id !== user.id
        );
        console.log(filteredUsers, "usuarios filtrados")
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: filteredUsers });
        return data.data;
      }
      console.log(data, "error de data");
      dispatch({ type: GET_ALL_USERS_ERROR, error: data.error.message });
    } catch (error) {
      console.log(error, "error de catch");
      dispatch({ type: GET_ALL_USERS_ERROR, error: error.message });
    }
  };
};
export const searchUserByName = (name) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`${local_url}/user/search/user/${name}`);
      if (json.data) {
        dispatch({ type: SEARCH_USER_BY_NAME, payload: json.data.data });
        return;
      }
    } catch (error) {
      dispatch({
        type: SEARCH_USER_BY_NAME_ERROR,
        error: "No se encontraron resultados para la búsqueda",
      });
    }
  };
};
export const getProfileById = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${local_url}/user/${id}`);
    if (data) {
      dispatch({ type: GET_PROFILE, payload: data.data });
    }
  };
};
export const reserupdate = () => {
  return (dispatch) => {
    dispatch({ type: RESET_UPDATE });
  };
};
export const updateUser = (id, formData, dispatc) => {
  return async (dispatch) => {
    dispatch({ type: REQUEST_UPDATE });
    try {
      const { data } = await axios.put(`${local_url}/user/${id}`, formData, {
        headers: getAuthHeaders(),
      });
      if (data) {
        await updateUserSuccess(dispatc, data); // llamando a updateUserSuccess
        dispatch({ type: UPDATE_USER_SUCESS, data: data });

        return;
      }
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: "No se pudo actualizar el usuario",
      });
    }
  };
};
export const deletconversation = (id) => {
  return async (dispatch) => {
    dispatch({ type: REQUEST_DELETE_CONVERSATION });
    try {
      const { data } = await axios.delete(`${local_url}/conversation/${id}`);
      dispatch({ type: DELETE_CONVERSATION_SUCCESS });
      return;
    } catch (error) {
      dispatch({
        type: DELETE_CONVERSATION_ERROR,
        payload: "no se pudo eliminar",
      });
    }
  };
};
export const {
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS_SUCCESS,
  RREQUEST_ALL_USER,
  SEARCH_USER_BY_NAME,
  SEARCH_USER_BY_NAME_ERROR,
  GET_PROFILE,
  UPDATE_USER_SUCESS,
  UPDATE_USER_ERROR,
  REQUEST_UPDATE,
  REQUEST_DELETE_CONVERSATION,
  DELETE_CONVERSATION_ERROR,
  DELETE_CONVERSATION_SUCCESS,
  RESET_UPDATE,
} = reducerSlice.actions;
export default reducerSlice.reducer;
