import axios, { AxiosInstance } from 'axios';

const axiosService: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 15 * 1000,
  withCredentials: true
});

axiosService.interceptors.request.use(
  (config) => config,
  (error) => error
);

axiosService.interceptors.response.use(
  (response) => response.data,
  (error) => error
);

export { axiosService };
