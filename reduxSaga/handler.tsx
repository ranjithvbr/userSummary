import { call, put } from "redux-saga/effects";
import { fieldParams } from "../pages/types";

import {
  GET_USER_SUCCESS,
  POST_USER_SUCCESS,
  PUT_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from "./constants";
import { userSummary, postSummary, putSummary, deleteSummary } from "./action";

export function* userSummaryHandler(): any {
  const response = yield call(userSummary);
  yield put({
    type: GET_USER_SUCCESS,
    payload: response,
  });
}

export function* postUserSummaryHandler(data: { payload: fieldParams }): any {
  const { payload } = data;
  const response = yield call(postSummary, payload);
  yield put({
    type: POST_USER_SUCCESS,
    payload: response,
  });
}

export function* putUserSummaryHandler(data: { payload: fieldParams }): any {
  const { payload } = data;
  const response = yield call(putSummary, payload);
  yield put({
    type: PUT_USER_SUCCESS,
    payload: response,
  });
}

export function* deleteUserSummaryHandler(data: {
  payload: { id: string };
}): any {
  const { payload } = data;
  const response = yield call(deleteSummary, payload);
  yield put({
    type: DELETE_USER_SUCCESS,
    payload: response,
  });
}
