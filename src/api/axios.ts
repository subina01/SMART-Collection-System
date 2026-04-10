import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { API_BASE_URL, ROUTES } from '@/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear auth and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  },
);

export default apiClient;
