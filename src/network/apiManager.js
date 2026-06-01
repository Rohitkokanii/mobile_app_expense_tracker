import axios from 'axios';
import navigationService from '../utils/services/navigationService';
import {basePath} from '../utils/constant/networkConstant';
import {getToken, removeToken} from '../store/local-store/localDB';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo4ODQsImZpcnN0X25hbWUiOm51bGwsInR5cGUiOjMsImlhdCI6MTc3NDI1MDIyMiwiZXhwIjoxODA1Nzg2MjIyfQ.KlSS50PAqCjH39aZb50lwsUONV6wNGIGfFavjWPjGGA';
const apiManager = axios.create({
  baseURL: basePath,
  responseType: 'json',
  withCredentials: true,
});
apiManager.interceptors.request.use(
  async config => {
    const token = await getToken();
    // console.warn(`Highlighted value is Token :- ${token}`);
    // const language = await getObject('language');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // if (language) {
    //   config.params = {
    //     ...config.params,
    //     language_id: language?.id,
    //   };
    // } else {
    //   config.params = {
    //     ...config.params,
    //     language_id: 1,
    //   };
    // }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// apiManager.interceptors.response.use(
//   response => response,
//   error => {
//     if (error?.response && error?.response?.status === 401) {
//       removeToken();

//       navigationService.reset({
//         index: 0,
//         routes: [
//           {
//             name: 'PhoneAuthScreen',
//           },
//         ],
//       });
//     }
//     return Promise.reject(error);
//   },
// );
export default apiManager;
