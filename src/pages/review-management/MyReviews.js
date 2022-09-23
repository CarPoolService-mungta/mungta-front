import MainCard from '../../components/MainCard';

import { TextField, Button, Grid } from '@mui/material';

import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-1.png';
import avatar3 from 'assets/images/users/avatar-1.png';
import Typography from '@mui/material/Typography';

import DataTable from "../../components/@extended/DataTable";


import {useCallback, useEffect, useState} from "react";
import Rating from "@mui/material/Rating";


function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (

    <MainCard darkTitle={true} title={'마이 리뷰'}>
       <Grid
            container
            direction="row"
            //justifyContent="flex-end"
            spacing={2}>
   
        </Grid>
        <DataTable columns={columns} rows={data} rowsPerPageOptions={[10,20,30]}/>
    </MainCard>
  );
}

const columns = [
    {
        id: 'id',
        label: 'No.',
        width: 50,
        align: 'center',
    },
    {
        id: 'targetRole',
        label: '역할',
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