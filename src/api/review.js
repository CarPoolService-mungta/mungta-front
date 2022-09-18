import {axios} from 'utils';

 export const getReviewByReviewerId = async params =>
 axios.get('/api/review/my-review', {params});


 export const registerReview = async params =>
    axios.post('/api/review', params);

export const modifyReview = async (id, params) =>
    axios.put('/api/review/' + id, {params});

export const deleteReview = async (id, params) =>
    axios.delete('/api/review' + id, {params});