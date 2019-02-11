import { AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS } from "./types";
import axios from "axios";

const TOKEN_NAME = "expense_app_token";

export const signIn = request_data => {
  return async dispatch => {
    dispatch({ type: AUTH_ATTEMPTING });
    try {
      const {
        data: { token }
      } = await axios.post("http://localhost:5000/api/v1/auth", request_data);
      dispatch(success(token));
    } catch (e) {
      const {
        response: { data }
      } = e;

      dispatch(error(data.error));
    }
  };
};

const success = token => {
  localStorage.setItem(TOKEN_NAME, token);
  return { type: AUTH_SUCCESS };
};
const error = error => {
  return { type: AUTH_FAILED, payload: error };
};
