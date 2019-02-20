import { EXPENSE_SAVED, RESET_SAVED_FLAG } from "./types";
import { apiSaveExpense } from "../api/expense";
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

//CAN BE TYPE IN TWO WAYS:
//1:
export const resetSaved = () => {
  return { type: RESET_SAVED_FLAG };
};
//2:
//export const resetSaved = () => ({ type: RESET_SAVED_FLAG });