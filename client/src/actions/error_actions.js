import { ADD_ERROR, CLEAR_ERROR } from "./types";

export const addErrorMsg = e => {
  const {
    response: {
      data: { error }
    }
  } = e;
  return { type: ADD_ERROR, payload: error };
};
export const clearErrorMsg = error => {
  return { type: CLEAR_ERROR };
};
