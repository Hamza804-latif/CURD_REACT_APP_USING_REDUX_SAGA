import * as types from "./actionTypes";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
} from "./actions";
import { createUserApi, loadUsersApi } from "./api";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  call,
  delay,
  fork,
} from "redux-saga/effects";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response?.data));
    }
  } catch (error) {
    yield put(loadUsersError(error?.response?.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess());
    }
  } catch (error) {
    yield put(createUserError(error?.response?.data));
  }
}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
