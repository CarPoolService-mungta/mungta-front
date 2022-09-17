import MainCard from 'components/MainCard';
import DataTable from "components/@extended/DataTable";
import {useCallback, useEffect, useState} from "react";
import {getFindByReviewerId} from 'api/review';
import {useNavigate} from 'react-router-dom';
import {Button, Grid} from "@mui/material";
import { axios } from 'utils';


const Questions = ()=>{
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async ()=>{
      axios({
        method:'GET',
        url:'http://http://localhost:8089/mungta/reviews?reviewerId=kim%40sk.com'
      }).than(response => setData(response.data))
   
    });

    const searchReview = async ()=>{
        await setIsLoading(true);
        // Todo 수정 필요
        const ReviewerId=0;
        const response = await getFindByReviewerId({ReviewerId});
   
    }

    const rowClick=useCallback((e,row)=>{
        const questionId = row.id;
        navigate(`/review/${ReviewerId}`);

    },[])


    return (
   
   <ul>
    {data.map(reveiw=> (
      <li key={data.id}>{data.partyId}</li>
    ))}

   </ul> );
}

export default Questions;
