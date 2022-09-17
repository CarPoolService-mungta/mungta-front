import { axios } from 'utils';

/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const getMatchInfo = async (params) => axios.get('/match/matchInfo', { params });
/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const getMatchUsers = async (params) => axios.get('/match/partymembers', { params });
/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const applyParty = async (data) => axios.post('/match/apply', data);
/**
 * @param {{userId: number}} params
 */
export const cancelParty = async (data) => axios.post('/match/cancel', data);
/**
 * @param {{partyId: number}} params
 */
// export const getPartyInfo = async (data) => axios.post('/matches/getMatchInfo', data);
