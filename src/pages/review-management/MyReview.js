import MainCard from '../../components/MainCard';

import { TextField, Button, Grid } from '@mui/material';

import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import avatar1 from 'assets/images/users/avatar-1.png';

import Typography from '@mui/material/Typography';

import DataTable from '../../components/@extended/DataTable';

import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getReviewByReviewerId } from 'api/review';
import CustomError from 'utils/CustomError';

import Rating from '@mui/material/Rating';

const MyReview = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    await searchReview();
  }, []);

  const searchReview = async () => {
    await setIsLoading(true);

    setIsLoading(true);
    const response = await getReviewByReviewerId({reviewerId:"cho"});
    if(response instanceof CustomError){
        enqueueSnackbar(response.message, {variant: 'error'});
        return;
    }

    setData(response.reviews);
    setIsLoading(false);
  };

  const rowClick = useCallback((e, row) => {
    const reviewerId = row.id;
    navigate(`/my-review/${reviewerId}`);
  }, []);

  return (
    <MainCard darkTitle={true} title={'내가 작성한 리뷰'}>
      <DataTable
        columns={columns}
        rows={data}
        rowsPerPageOptions={[10, 20, 30]}
        isLoading={isLoading}
        rowClick={rowClick}
      />
    </MainCard>
  );
  };

export default MyReview;

const columns = [
  {
    id: 'id',
    label: 'No.',
    width: 50,
    align: 'center',
  },
  {
    id: 'reviewTargetId',
    label: '리뷰대상',
    width: 60,
    align: 'center',
  },
  {
    id: 'modifiedDateTime',
    label: '리뷰날짜',
    width: 60,
    align: 'center',
  },
  {
    id: 'reviewScore',
    label: '별점',
    width: 60,
    align: 'center',
    render: (row)=>{
      return <>
          <Rating name="read-only" value={row.reviewScore} readOnly />
      </>
  }
  },
  {
    id: 'comment',
    label: '내용',
    width: 290,
    align: 'left',
  },
];
