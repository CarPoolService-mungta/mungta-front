import {axios} from 'utils';
import axiosInstance from 'utils/axiosHandler';
import stringify from 'json-stringify';


/**
 * 현재 참여 가능한 카풀리스트 전체 검색
 * condition : "start_date", "distance", "review_average_score", ""
 * @param {{condition:String}} params
 * @returns
 */
export const getPartyInfoAllNow = async params =>
       axiosInstance.get('/partyInfos/carpool-now-list',{params});

// export const postMoveInfo = async (data) =>
//        axiosInstance.post('/partyInfos/post-moveinfo',data);
// export const postMoveInfo = async (data)=>{
//     console.log('postMoveInfo다',data);
//     return axios.post(process.env.REACT_APP_API_SERVER+'/api/partyInfos/post-moveinfo',data);
// }

export const postMoveInfo = async function (Data) {
    console.log('이거 넣는다',Data)
    console.log('이거 넣는다',Data.curNumberOfParty)
    console.log('이거 넣는다',Data.maxNumberOfParty)
    console.log('이거 넣는다2',stringify(Data))
    let url =process.env.REACT_APP_API_SERVER + '/api/partyInfos/post-moveinfo';
    let headers ={  "Content-Type": 'application/json',}
    //formdata로 해야 읽히는디.. 안되는디 json으로 읽어야함 객체안에 객체있어서
    console.log('url:',url);
    //const response = axios.post(process.env.REACT_APP_API_SERVER+'/api/partyInfos/post-moveinfo2',data=stringify(Data),{headers:{  "Content-Type": 'application/json'}});
    const response = await axios.post(url,stringify(Data),{headers});
    //axiosInstance.post('/partyInfos/post-moveinfo',{Data})
    console.log(response);
    return response;
}


export const postMoveInfo2 = async function (Data) {

    const response = await axios.post(process.env.REACT_APP_API_SERVER + '/api/partyInfos/post-moveinfo2', stringify(Data));
    return response.data;
}
/**
 * 현재 참여 가능한 카풀리스트 전체 검색
 * condition : "start_date", "distance", "review_average_score", ""
 * @param {*} params
 * @returns
 */
export const postMoveInfo3 = async params =>
        axiosInstance.post('/partyInfos/post-moveinfo',{params});

