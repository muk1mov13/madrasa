import {call, put, takeLatest} from "redux-saga/effects";
import {
    loginError,
    loginStart, loginSuccess

} from "../reducers/LoginSlice";
import axios from "axios";
import {toast} from "react-toastify";

function* workLoginUser(action) {
    console.log( typeof action.payload.phone)

    try {
        yield put(loginStart());
        const response = yield call(() =>
            axios.post(
                "http://localhost:8080/api/v1/auth/login",
                {
                    phone: action.payload.phone,
                    password: action.payload.password,
                    rememberMe: action.payload.rememberMe
                }
            )
        );
        if (response.status === 200) {
            toast.success("muvaffaqiyatli ro'yhatdan o'tdingiz!")
            localStorage.setItem("access_token", response?.data.access_token);
            localStorage.setItem("refresh_token", response?.data.refresh_token);
            yield put(loginSuccess());
            window.location = "/"
        }
        if (response.data.roles[0].name === "ROLE_SUPER_ADMIN") {
            action.payload.navigate("/dashboard");
        }
    } catch (error) {
        if (error.response.status === 500) {
            yield put(loginError("Login or password is wrong"));
            toast.error("Login yoki parol noto'g'ri");
        }
    }
}

export default function* loginSaga() {
    yield takeLatest("login/loginRequest", workLoginUser);
}
