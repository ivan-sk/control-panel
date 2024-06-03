import axios, { AxiosResponse } from "axios";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

export const useAxiosInterceptor = () => {
  const { setAuthenticatedUser } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const { response } = error;
        if (response && response.status === 401) {
          setAuthenticatedUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [setAuthenticatedUser]);

  return null;
};

export default axiosInstance;
