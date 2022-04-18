import { takeLatest } from "redux-saga/effects";
import {
  GET_USER_SUMMARY,
  POST_USER_SUMMARY,
  PUT_USER_SUMMARY,
  DELETE_USER_SUMMARY,
} from "./constants";
import {
  userSummaryHandler,
  postUserSummaryHandler,
  putUserSummaryHandler,
  deleteUserSummaryHandler,
} from "./handler";

function* userSummarySaga() {
  yield takeLatest(GET_USER_SUMMARY, userSummaryHandler);
  yield takeLatest(POST_USER_SUMMARY, postUserSummaryHandler);
  yield takeLatest(PUT_USER_SUMMARY, putUserSummaryHandler);
  yield takeLatest(DELETE_USER_SUMMARY, deleteUserSummaryHandler);
}
export default userSummarySaga;
