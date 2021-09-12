import { handleActions } from 'redux-actions';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as api from '../utils/Api';

const GET_POST = 'subscribes/GET_POST';
const GET_POST_SUCCESS = 'subscribes/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'subscribes/GET_POST_FAILURE';

export const getPost = () => {
  return { type: GET_POST };
};

export function* getPostSaga() {
  try {
    console.log('1231231');
    const response = yield call(api.loadSubscribeDatas);

    yield put({
      type: GET_POST_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
    });
  }
}

export function* postsSaga() {
  yield takeLatest(GET_POST, getPostSaga);
}

const initialState = {
  loading: false,
  post: [],
};

export default function subscribes(state = initialState, action) {
  switch (action.type) {
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false, //요청 완료
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        loading: false, //요청 완료
      };
    default:
      return state;
  }
}
