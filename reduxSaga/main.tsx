import { all } from "redux-saga/effects";
import userSummarySaga from "./sagas";

function* handler() {
  yield all([userSummarySaga()]);
}
export { handler };
