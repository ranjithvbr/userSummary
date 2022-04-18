import { combineReducers } from "redux";
import userSummaryReducer from "./userSummary";

const reducer = combineReducers({
  userSummary: userSummaryReducer,
});

export { reducer };
