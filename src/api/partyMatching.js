import { axios } from 'utils';

/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const getMatchInfo = async (params) =>
  axios.get('/match/matchInfo', { params });
/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const getMatchUsers = async (params) =>
  axios.get('/match/partymembers', { params });
/**
 * @param {{partyInfoId: number, userId: number}} params
 */
export const applyParty = async (data) => axios.post('/match/apply', data);
/**
 * @param {{userId: number}} params
 */
export const cancelMatch = async (data) => axios.post('/match/cancel', data);
/**
 * @param {{partyId: number}} params
 */
export const acceptMatch = async (data) => axios.post('/match/accept', data);
/**
 * @param {{partyId: number}} params
 */
export const denyMatch = async (data) => axios.post('/match/deny', data);
/**
 * @param {{partyId: number}} params
 */
export const startParty = async (matchProcess) => axios.post('/match/partyStart', matchProcess);
/**
 * @param {{partyId: number}} params
 */
export const closeParty = async (matchProcess) => axios.post('/match/partyClose', matchProcess);
/**
 * @param {{partyId: number}} params
 */
// export const cancelParty = async (data) =>
//   axios.post('/match/partyCancel', data);
