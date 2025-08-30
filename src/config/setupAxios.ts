import axios from "axios";
import API_URL from "../config";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(
                    `${API_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                return axios(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login?sessionExpired=true";
            }
        }

        return Promise.reject(error);
    }
);
