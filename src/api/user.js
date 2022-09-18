import {axios} from 'utils';

export const authenticatedByEmail = async data => axios.post('/api/user/auth/mail', data);

export const authnumcheckByEmail = async params => axios.get('/api/user/auth/confirm',  {params});

export const signinById = async data => axios.post('/api/user/auth/signin', data);

export const getPhotoByUserId = async (id) => axios.get('/api/user/auth/downloadFile/' + id);

export const signupById = async data => axios.post('/api/user/auth/signup', data);






/**
 * @param {{refreshToken: string}} data
 */
export const authRefresh = async data =>
    axios.put('/api/user/token-refresh',null,{
        headers: data
    });

