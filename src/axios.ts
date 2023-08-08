import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_PORT}/api`
})

// instance.interceptors.request.use(config => {
//     config.headers.Authorization = localStorage.getItem(LocalStorageNames.TOKEN)
//     return config
// })

export default instance