import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import subscribes, { postsSaga } from "./subscribeSaga";

const rootReducer = combineReducers({
  auth,
  subscribes,
});
export function* rootSaga() {
  yield all([postsSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
