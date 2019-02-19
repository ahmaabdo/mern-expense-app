import { EXPENSE_SAVED } from "./types";
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
