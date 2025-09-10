import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";

export type ValidationIssue = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  message: string;
  errors?: ValidationIssue[];
};

export type NormalizedApiError = {
  message: string;
  status?: number;
  data?: ApiErrorResponse;
  code?: string;
};

const TOKEN_KEY = "auth_token";

const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
const setToken = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token);
const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post<{ access_token: string }>(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.access_token;
        setToken(newToken);
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        onRefreshed(newToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        clearToken();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    const response = await apiClient<T>(config);
    return response;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;

    const normalizedError: NormalizedApiError = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code,
    };

    throw normalizedError;
  }
}
