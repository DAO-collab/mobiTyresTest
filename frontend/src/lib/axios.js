import axios from 'axios'

/** to be used to show errors to user on ui
import { createApp } from 'vue'

import { createPinia } from 'pinia'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
import { useAppStore } from '@/stores/state.js'
const state = useAppStore()
console.log("state ", state.step);
*/
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 60000,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
})

/** 
axiosInstance.interceptors.response.use(null, (err)=> {
    console.log("axios err ", err);
    state.handleRequestErrors(err)
    console.log("passed");
})
*/
export default axiosInstance