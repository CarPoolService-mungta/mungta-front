import {axios} from 'utils';

export const signinById = async data => axios.post('/api/user/auth/signin', data);

