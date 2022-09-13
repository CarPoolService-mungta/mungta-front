import {axios} from 'utils';

// 사용자 로그인
export const signinById = async data => {
  return axios.post('/api/user/auth/signin', data);
}
