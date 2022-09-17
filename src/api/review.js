import {axios} from 'utils';
/**
 * @param {{reviewerId: number}} params
 */
 export const getFindByReviewerId = async params =>
 axios.get('/mungta/reviews', {params});
