import { AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS, USER_LOGGED_OUT, PROFILE_FEATCH } from "../actions/types";

const INITIAL_STATE = {
  attempting: false,
  isAuth: false,
  profile: {},
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_ATTEMPTING:
      return { ...state, attempting: true, isAuth: false, error: null };
    case AUTH_SUCCESS:
      return { ...state, attempting: false, isAuth: true, error: null };
    case AUTH_FAILED:
      return {
        ...state,
        attempting: false,
        isAuth: false,
        error: action.payload
      };
    case USER_LOGGED_OUT:
      return { ...state, isAuth: false, profile: {} };
    case PROFILE_FEATCH:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
