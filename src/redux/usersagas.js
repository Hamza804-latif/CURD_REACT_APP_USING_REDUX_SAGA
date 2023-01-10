import * as types from "./actionTypes";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
} from "./actions";
import { createUserApi, deleteUserApi, loadUsersApi } from "./api";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  call,
  delay,
  fork,
  takeLeading,
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
    yield call(createUserApi, payload);
    yield put(createUserSuccess());
  } catch (error) {
    yield put(createUserError(error?.response?.data));
  }
}

function* onDeleteUserStartAsync({ payload }) {
  try {
    yield call(deleteUserApi, payload);
    yield delay(500);
    yield put(deleteUserSuccess(payload));
  } catch (error) {
    yield put(deleteUserError(error?.response?.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  yield takeLeading(types.DELETE_USER_START, onDeleteUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onDeleteUser)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
