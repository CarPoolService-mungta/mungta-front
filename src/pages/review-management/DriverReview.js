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


function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  return (

    <MainCard darkTitle={true} title={'운전자 리뷰'}>
      <Grid container display="flex" style={{ marginBottom:30}}>
        <Card sx={{ maxWidth: 200 }}>
            <CardMedia component="img" height="200" src={avatar1} />
            <CardContent>
              <Typography
                align="center"
                gutterBottom
                variant="h4"
                component="div"
              >
                운전자
              </Typography>
              <Typography variant="body2" color="text.secondary">
                부서
              </Typography>
              <Typography variant="body2" color="text.secondary">
                이름
              </Typography>
            </CardContent>
        </Card>
      </Grid>
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
      id : 'createdDate',
      label: '리뷰날짜',
      width: 60,
      align: 'left',
  },
  {
      id : 'starrating',
      label: '별점',
      width: 60,
      align: 'left',
  },
  {
      id : 'existResponse',
      label: '코멘트',
      width: 290,
      align: 'left',
      }
];