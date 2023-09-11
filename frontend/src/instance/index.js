import axios from "axios";

export default function (url, method, data, params, responseType) {
    const BASE_URL = "http://localhost:8080/api";
    let token = localStorage.getItem("access_token");

    const clearLocalStorageItem = () => {
        window.location.href = "/login";
        localStorage.removeItem("access_token");
    };

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
            console.log(error.response)
            if (error.response.status == 401) {
                clearLocalStorageItem()
            }
        }
    });
}
