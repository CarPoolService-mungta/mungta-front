import { parseJwt, setAuthHeader, localStorageHandler} from 'utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

export const login =({userEmail, password})=>{
  //const response = api.login({userId, password});
  //{accessToken, refreshToken} = response.data
  console.log("userEmail : ", userEmail, " password : ", password);
  // {
  //   "userId": "0",
  //   "email": "test@test.com",
  //   "name": "홍길동",
  //   "userType" : "ADMIN",
  //   "driverYn" : "Y",
  //   "iat": 1662517190,
  //   "exp" : 1664504390
  // }

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6Iu2Zjeq4uOuPmSIsInVzZXJUeXBlIjoiQURNSU4iLCJkcml2ZXJZbiI6IlkiLCJpYXQiOjE2NjI1MTcxOTAsImV4cCI6MTY2NDUwNDM5MH0.xhgRAecvex48uXr_3I6kWD2J1d0QCJO2YqXSk_afm-Q"
  // {
  //   "userId": "0",
  //   "iat": 1662517190,
  //   "exp" : 1664504390
  // }
  const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwIiwiaWF0IjoxNjYyNTE3MTkwLCJleHAiOjE2NjQ1MDQzOTB9.in30mQ5K_lQzhil0-B0mI9-EP9IomiEXvmtc-ooyzv8"
  setAuthHeader(`Bearer ${accessToken}`);
  localStorageHandler.setItem(ACCESS_TOKEN, accessToken);
  localStorageHandler.setItem(REFRESH_TOKEN, refreshToken);
  //parseJwt한 부분은 redux에 저장
  console.log("userInfo:", parseJwt(accessToken));
}