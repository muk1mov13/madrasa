import {all,fork} from "redux-saga/effects";
import loginSaga from "./LoginSaga";

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
    ])
}