import {axios} from 'utils';

export const signinById = async data => axios.post('/api/user/auth/signin', data);

export const authenticatedByEmail = async data => axios.post('/api/user/auth/mail', data);

export const authnumcheckByEmail = async params => axios.get('/api/user/auth/confirm',  {params});

export const getPhotoByUserId = async (id) => axios.get('/api/user/auth/downloadFile/' + id);


