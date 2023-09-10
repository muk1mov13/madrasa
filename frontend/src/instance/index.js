import axios from "axios";

export default function (url, method, data, params, responseType) {
    const BASE_URL = "http://localhost:8080/api";
    let token = localStorage.getItem("access_token");

    // const clearLocalStorageItem = () => {
    //     window.location.href = "/login";
    //     localStorage.removeItem("access_token");
    //     localStorage.removeItem("refresh_token");
    //     localStorage.removeItem("rememberMe");
    // };

    return axios({
        url: BASE_URL + url,
        method: method,
        params,
        data: data,
        responseType: responseType,
        headers: {
            Authorization: token,
        },
    }).catch((error) => {
        if (error) {
            if (error.response.status == 401) {
                if (localStorage.getItem("refresh_token")) {
                    return axios({
                        url: BASE_URL + "/api/auth/refresh/public",
                        method: "post",
                        params: {
                            refresh_token: localStorage.getItem("refresh_token"),
                        },
                    })
                        .then((res) => {
                            localStorage.setItem("access_token", res.data);
                            return axios({
                                url: BASE_URL + url,
                                method: method,
                                params,
                                data: data,
                                responseType: responseType,
                                headers: {
                                    Authorization: localStorage.getItem("access_token"),
                                },
                            });
                        })
                        .catch((err) => {
                            if (err.response.status === 401) {
                                // clearLocalStorageItem()
                            }
                            return Promise.reject(err);
                        });
                } else {
                    // clearLocalStorageItem()
                    return Promise.reject(error);
                }
            } else {
                return Promise.reject(error);
            }
        }
    });
}
