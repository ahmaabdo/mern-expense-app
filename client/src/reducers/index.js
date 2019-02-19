import { combineReducers } from "redux";

import auth from "./auth_reducre";
import expense from "./expense_reducer";
import error from "./error_reducer";

export default combineReducers({
  auth,
  expense,
  error
});
