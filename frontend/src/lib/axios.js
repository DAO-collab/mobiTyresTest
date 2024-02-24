import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 60000,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
})


export default axiosInstance