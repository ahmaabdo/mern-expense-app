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

export const fetchExpense = () => {
  return async dispatch => {
    try {
      dispatch({ type: FETCHING_EXPENSE });
      const { data } = await apiFetchExpense();
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