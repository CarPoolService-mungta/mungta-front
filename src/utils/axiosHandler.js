import axios from 'axios';
import qs from 'qs';
import CustomError from './CustomError'
import { logOut } from './authProvider';

const axiosInstance = axios.create({
  // baseURL: `http://localhost:8080/api`,//나중에 ENV에 공통으로 만들기
  baseURL: process.env.REACT_APP_API_SERVER,
  paramsSerializer: (params) => qs.stringify(params),
});

//Auth 들어오면 로그인하면서 헤더에 추가
export const setAuthHeader = str => {
  console.log("setAuthHeader",str);
  axiosInstance.defaults.headers.common.Authorization = str;
};

axiosInstance.interceptors.request.use(
  config => {
    console.log("config",config);
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
    ({status: httpStatus, data: response}) => {
      // if (httpStatus <200 || httpStatus >= 300) throw new CustomError(response);
      return response;
    },
    ({httpStatus, response}) => {
        if(response.status == 401){
          if(response.data==-10){
            console.log("토큰이 만료되었습니다.")
          }
          logOut();
          return;
        }
        if(response.data){
            return new CustomError(response.data.message, response.data.status)
        }
        return new CustomError("알수 없는 오류 발생", -9999999999);
      // return Promise.reject(new CustomError("알수 없는 오류 발생", -9999999999));
    },
);
export default axiosInstance;
