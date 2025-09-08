import { useState, useEffect, useRef, useCallback } from "react";
import axios, { type AxiosRequestConfig, type CancelTokenSource } from "axios";
import { toast } from "sonner";

type ValidationIssue = {
  field: string;
  message: string;
};

type ApiError = {
  message: string;
  errors?: ValidationIssue[];
};

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `http://localhost:5000/api/auth/refresh`,
          {},
          { withCredentials: true } // cookie included
        );

        const newToken = res.data.token;
        localStorage.setItem("authToken", newToken);
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        onRefreshed(newToken);

        return apiClient(originalRequest);
      } catch (err) {
        localStorage.removeItem("authToken");
        window.location.href = "/auth";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const useApi = ({
  url = "",
  method = "GET",
  data = null,
  params = {},
  headers = {},
  immediate = false,
  axiosConfig = {},
  onSuccess = null,
  onError = null,
} = {}) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const cancelTokenRef = useRef<CancelTokenSource | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Component unmounted");
      }
    };
  }, []);

  const execute = useCallback(
    async (overrides: AxiosRequestConfig = {}) => {
      cancelTokenRef.current = axios.CancelToken.source();

      const config = {
        url: overrides.url || url,
        method: overrides.method || method,
        data: overrides.data || data,
        params: overrides.params || params,
        headers: { ...headers, ...overrides.headers },
        cancelToken: cancelTokenRef.current.token,
        ...axiosConfig,
        ...overrides,
      };

      if (
        ["GET", "DELETE", "HEAD", "OPTIONS"].includes(
          config.method.toUpperCase()
        )
      ) {
        delete config.data;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiClient(config);

        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        if (onSuccess) {
          onSuccess(response.data, response);
        }

        return { data: response.data, response };
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        const error = {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          code: err.code,
        };

        setState({
          data: null,
          loading: false,
          error,
        });

        const apiError = error.data as ApiError;

        if (apiError?.errors) {
          apiError.errors.forEach((issue) => {
            toast.error("Validation Error", {
              description: `${issue.field.replace("body.", "")}: ${
                issue.message
              }`,
            });
          });
        } else {
          toast.error("Error", {
            description:
              apiError?.message || error.message || "Something went wrong",
          });
        }

        if (onError) {
          onError(error, err);
        }

        throw error;
      }
    },
    [url, method, data, params, headers, axiosConfig, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate && url) {
      execute();
    }
  }, [immediate, execute, url]);

  return {
    ...state,
    execute,
    reset,
  };
};

export const useGet = (url, config = {}) => {
  return useApi({
    url,
    method: "GET",
    immediate: true,
    ...config,
  });
};

export const usePost = (url, config = {}) => {
  return useApi({
    url,
    method: "POST",
    ...config,
  });
};

export const usePut = (url, config = {}) => {
  return useApi({
    url,
    method: "PUT",
    ...config,
  });
};

export const useDelete = (url, config = {}) => {
  return useApi({
    url,
    method: "DELETE",
    ...config,
  });
};
