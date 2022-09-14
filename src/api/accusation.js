import {axios} from 'utils';

 export const getPartyMembers = async params =>
    axios.get('/accusation/party-members', {params});

export const getAccusationsByMemberId = async params =>
    axios.get('/accusation', {params});

export const getAccusationByMemberId = async params =>
    axios.get('/accusation/list/:id', {params});

export const registerAccusation = async params =>
    axios.post('/accusation', params);

export const modifyAccusation = async params =>
    axios.put('/accusation/list/:id', {params});

export const deleteAccusation = async params =>
    axios.delete('/accusation/list/:id', {params});

export const getAdminAccusations = async params =>
    axios.get('/accusation/admin/accusations', {params});

export const getAdminAccusation = async params =>
    axios.get('/accusation/admin/accusations/:id', {params});

export const processAccusationByAdmin = async params =>
    axios.put('/accusation/admin/accusations/:id', {params});
