import {axios} from 'utils';

export const signinById = async data => axios.post('/api/user/auth/signin', data);

export const authenticatedByEmail = async data => axios.post('/api/user/auth/mail', data);

export const authnumcheckByEmail = async params => axios.get('/api/user/auth/confirm',  {params});


/**
 * @param {{refreshToken: string}} data
 */
export const authRefresh = async data =>
    axios.put('/api/user/token-refresh',null,{
        headers: data
    });

