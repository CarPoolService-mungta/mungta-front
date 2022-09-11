import {axios} from 'utils';
import axiosInstance from 'utils/axiosHandler';
import stringify from 'json-stringify';


/**
 * 현재 참여 가능한 카풀리스트 전체 검색
 * condition : "start_date", "distance", "review_average_score", ""
 * js : SelectCarpoolList.js
 * @param {{condition:String}} params
 * @returns
 */
export const getPartyInfoAllNow = async params =>
       axiosInstance.get('/party-management/partyInfos/carpool-now-list',{params});

/**
*  개인 별 진행 중인 카풀 내역 검색
* js : MyCarpoolList.js
*/
export const getPartyInfoMyNow = async params =>
       axiosInstance.get('/party-management/partyInfos/my-carpool-now-list',{params});

/**
*  개인 별 지난 카풀 내역 검색
* js : MyCarpoolPastList.js
*/

/**
 * 이동정보 등록
 * 415 error -> headers application/json으로 설정필요
 * springboot에서 requestbody 못 받는 이슈가 있었는데, import 잘못해서 였음.
 * js : moveInfoRegister.js -> 대문자로 변경할 것
 */
export const postMoveInfo = async function (Data) {
    let url      = process.env.REACT_APP_API_SERVER + '/api/party-management/partyInfos/post-moveinfo';
    let headers  = {  "Content-Type": 'application/json', }
    const response = await axios.post(url,stringify(Data),{headers});
    console.log(response);
    return response;
}

