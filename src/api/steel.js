import axios from 'axios';

// config
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

// Adjunta el token JWT a cada request saliente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('steel_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// response interceptor: refresh token
let isRefreshing = false;
// cola de requests que esperan el nuevo token      
let failedQueue = [];

// Resuelve o rechaza todas las requests encoladas
const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response.data,

    // capturar 401
    async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url ?? '';
        const isAuthEndpoint =
            requestUrl.includes('login') ||
            requestUrl.includes('sign-up') ||
            requestUrl.includes('refresh');

        // solo intenta el refresh si: 1. es 401, 2. no es un endpoint de auth (evita loops), 3. no es un reintento (evita loops)
        if (error.response?.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
            // Si ya hay un refresh en curso, encolar este request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                });
            }

            // setear flags para manejar reintentos y cola
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // pedir nuevos tokens al backend (realiza petición sin instancia 'api' para evitar interferencias con otros interceptores)
                const { data } = await axios.post(
                    `${API_URL}auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = data.accessToken;
                // guardar el nuevo accessToken
                localStorage.setItem('steel_token', newToken);

                // resolver las requests encoladas
                processQueue(null, newToken);

                // reintentar el request original con el token nuevo
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // el refreshToken también venció o es inválido → forzar re-login
                processQueue(refreshError, null);
                localStorage.removeItem('steel_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        // normaliza los errores enviados por el servidor
        const serverMessage = error.response?.data?.message;
        if (serverMessage) {
            error.message = serverMessage;
        }
        return Promise.reject(error);
    }
);

export default api