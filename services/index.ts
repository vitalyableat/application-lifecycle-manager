import axios, { type AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({ baseURL: process.env.SERVER_BASE_URL });

api.interceptors.request.use((config) => {
  // config.headers.setAuthorization(`Bearer ${getFromLocalStorage('token')}`);
  config.headers.setContentType('multipart/form-data');

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // errorService.addError(error.response?.data as IError);
    throw Error(error.response?.data?.message);
  },
);

// axios.interceptors.request.use(
//   (config) => {
//     const controller: AbortController = new AbortController();
//     const token: string = AuthService.getToken() ?? '';
//
//     config.signal = controller.signal;
//     config.headers.Authorization = `Bearer ${token}`;
//
//     return config;
//   },
//   async (error: AxiosError) => await Promise.reject(error),
// );

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && (error.response.status === 401 || error.response.status === undefined)) {
//       AuthService.updateToken(5)
//         .then(async (isRefreshed) => {
//           if (await isRefreshed) {
//             const token = AuthService.getToken() ?? '';
//
//             error.config.headers.Authorization = `Bearer ${token}`;
//
//             return await axios.request(error.config);
//           } else {
//             throw new Error('Failed to refresh the token, or the session has expired.');
//           }
//         })
//         .catch(async () => {
//           await AuthService.logout();
//         });
//     }
//
//     if (error?.response.status === 403) {
//       axios.request(error.config).catch(() => {
//         window.location.assign('/403');
//       });
//     }
//
//     return await Promise.reject(error);
//   },
// );
