import * as React from 'react';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AjaxUtils from 'utils/AjaxUtils';
import { ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './EmptyList';
import { Button, Stack, Box, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';
import MainCard from '../../../components/MainCard';

import PropTypes from 'prop-types';
import AnimateButton from '../../../components/@extended/AnimateButton';
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding:15
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize : '80%'
  }));
  const Subtitle = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize:'80%',
    color:'#fff'
  }));

const ListBgColor = {
  OPEN : '#B8FEFF',
  FULL : '#FF7B7B',
  STARTED : '#FFE67B',
  CLOSED : '#626262'
}

const ListStatusDesc = {
  OPEN : '신청 가능',
  FULL : '신청 마감',
  STARTED : '카풀 진행 중',
  CLOSED : '종료'
}




const MyCarpoolDetailForCarpooler = () => {

      return (
      <>
       <Grid item xs={12}>
            <MainCard title="운전자 Pay URL" codeHighlight>
                <Grid container spacing={3} wrap="nowrap">
                    <Grid item xs={6} sm={4} md={3} lg={2} >
                      {/* <Button component={Link} target="_blank" href="https://mantisdashboard.io" variant="contained" color="success" size="small">
                          Pro */}
                        <Button variant="contained" color="warning" size="small">
                            Kakao   
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2} >
                        <Typography>URL~</Typography>
                        <Button>지불하기
                        
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
        <Grid item xs={12}>
            <MainCard title="정산내역" codeHighlight>
                <Grid>
                    <Grid container justifyContent="start">
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Subtitle>지불요금</Subtitle></Item></Grid>
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="success">지불완료</Button></Item></Grid>
                    </Grid>
                    <Grid container justifyContent="start">
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Subtitle>운전자확인</Subtitle></Item></Grid>
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="error">정산미확인</Button></Item></Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
      </>
      );
};
export default MyCarpoolDetailForCarpooler;
