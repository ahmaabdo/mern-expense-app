import { EXPENSE_SAVED, RESET_SAVED_FLAG, FETCHING_EXPENSE, FETCHED_SUCCESS, FETCHED_FAILED } from "./types";
import { apiSaveExpense, apiFetchExpense } from "../api/expense";
import { addErrorMsg, clearErrorMsg } from "./error_actions";

export const saveExpense = expense => {
  return async dispatch => {
    try {
      dispatch(clearErrorMsg());
      await apiSaveExpense(expense);
      dispatch({ type: EXPENSE_SAVED });
    } catch (e) {
      dispatch(addErrorMsg(e));
    }
  };
};

export const fetchExpense = (month) => {
  return async dispatch => {
    try {
      const prefix = '/api/v1/expense';
      const url = month ? `${prefix}/${month}` : prefix;
      dispatch({ type: FETCHING_EXPENSE });
      const { data } = await apiFetchExpense(url);
      dispatch({ type: FETCHED_SUCCESS, payload: data.expense });
    } catch (e) {
      dispatch({ type: FETCHED_FAILED });
      dispatch(addErrorMsg(e));
    }
  }
};

//CAN BE TYPE IN TWO WAYS:
//1:
export const resetSaved = () => {
  return { type: RESET_SAVED_FLAG };
};
//2:
//export const resetSaved = () => ({ type: RESET_SAVED_FLAG });