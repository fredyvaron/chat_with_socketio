import axios from "axios";
export const local_url = import.meta.env.VITE_REACT_APP_URL_LOCAL;
export const REQUEST_lOGIN = "REQUEST_lOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REQUEST_REGISTER = "REQUEST_REGISTER";
export const USER_UPDATE = "USER_UPDATE";
export async function register(dispatch, payload) {
  try {
    dispatch({ type: REQUEST_REGISTER });
    const json = await axios.post(`${local_url}/auth/register`, payload);
    if (json.data.statusMsg === "Success") {
      const { data } = json;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: json.data,
      });
      return data;
    }
    dispatch({ type: REGISTER_ERROR, error: json.data.error });
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, error: error });
  }
}
export async function login(dispatch, payload) {
  try {
    dispatch({ type: REQUEST_lOGIN });
    const { data } = await axios.post(`${local_url}/auth/login/`, payload);
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data));
      window.localStorage.setItem("isAuthenticated", true);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error: error.response.data.message });
  }
}
export const updateUserSuccess = (dispatc, user) => {
  try {
    if (user.data.token) {
      window.localStorage.setItem("token", user.data.token);
      window.localStorage.setItem("user", JSON.stringify(user.data));
      window.localStorage.setItem("isAuthenticated", true);
      dispatc({
        type: USER_UPDATE,
        payload: user.data,
      });
    }
  } catch (error) {
    console.log("Error" + error);
  }
};

export async function logout(dispatch) {
  dispatch({ type: LOGOUT });
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("isAuthenticated");
  window.location.reload();
  window.location.href = "/login";
  return true;
}
