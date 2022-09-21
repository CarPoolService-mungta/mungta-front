import { axios } from 'utils';

/**
 * @param {{partyInfoId: number, userId: list}} params
 */
export const getMatchUsers = async (params) =>
  axios.get('/api/match/partymembers', { params });
/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const applyParty = async (data) => axios.post('/api/match/apply', data);
/**
 * @param {{userId: number}} params
 */
export const cancelMatch = async (data) => axios.post('/api/match/cancel', data);
/**
 * @param {{partyId: number}} params
 */
export const acceptMatch = async (data) => axios.post('/api/match/accept', data);
/**
 * @param {{partyId: number}} params
 */
export const denyMatch = async (data) => axios.post('/api/match/deny', data);
/**
 * @param {{partyId: number}} params
 */
export const startParty = async (matchProcess) => axios.post('/api/match/partyStart', matchProcess);
/**
 * @param {{partyId: number}} params
 */
export const closeParty = async (matchProcess) => axios.post('/api/match/partyClose', matchProcess);

/**
 * @param {{partyId: number}} params
 */
export const cancelParty = async (matchProcess) => axios.post('/api/match/party-cancel', matchProcess);
/**
 * @param {{partyInfoId: number}} params
 */
export const getPartyMemberSummary = async (params) =>
    axios.get('/api/match/partymembers/summary', { params });


