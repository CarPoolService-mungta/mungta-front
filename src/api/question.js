import {axios} from 'utils';

/**
 * @param {{userId: number}} params
 */
export const getQuestionsByUserId = async params =>
    axios.get('/question/question-show-by-userId', {params});
/**
 * @param {{id: number}} params
 */
export const getQuestionById = async params =>
    axios.get('/question/question-show', {params});

/**
 * @param {{id: number}} params
 */
export const deleteQuestionById = async params =>
    axios.delete('/question/question', {params});
