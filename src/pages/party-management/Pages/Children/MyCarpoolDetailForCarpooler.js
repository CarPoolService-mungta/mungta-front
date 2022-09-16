import * as React from 'react';
import { styled } from '@mui/material/styles';
import {ImageIcon, WorkIcon, BeachAccessIcon, ManageSearchIcon} from '@mui/icons-material/Work';
import AjaxUtils from 'utils/AjaxUtils';
import { ConvertToYYYYMMDDhhmmtoKor} from '../../Utils/DateUtils';
import EmptyList from './EmptyList';
import { Button, Stack, Box, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ComponentSkeleton from '../../../components-overview/ComponentSkeleton';
import MainCard from '../../../../components/MainCard';
import PropTypes from 'prop-types';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import {Demo,Item,Subtitle,ListBgColor,ListStatusDesc} from '../../Utils/ComponentTheme';
const InputTitle = {
    backgroundColor: '#1A2027',
    padding: '2px',
    textAlign: 'center',
    color:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35px',
    border: '2px solid #1A2027',
    borderRadius:1,
    boxShadow: 10,
    fontSize:"120%"
  }
  function isDriverChecked(carpooler) {
    return carpooler.driverCheck === 'PAID'
    && carpooler.userId==='test-d-001@gmail.com'
  }
  const MyCarpoolDetailForCarpooler = (props) => {
      console.log('MY Sub post',props.posts)
      const post = props.posts;
      const payChecked = !(post.carPooler.find(carpoolers=>isDriverChecked(carpoolers))===undefined);
      console.log(payChecked);
      return (
      <>
       <Grid item xs={12}>
            <MainCard title="운전자 Pay URL" codeHighlight>
                <Grid container spacing={3} wrap="nowrap">
                    <Grid item xs={6} sm={4} md={3} lg={2} >
                        <Button variant="contained" color="warning" size="small" onClick={()=>alert(post.driver.settlementUrl)}>
                            Kakao Pay Url
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
        <Grid item xs={12}>
            <MainCard title="정산내역" codeHighlight>
                {
                    // post.carPooler.filter(userId='');
                <Grid>
                    <Grid container justifyContent="start">
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Subtitle sx={InputTitle}>지불요금</Subtitle></Item></Grid>
                        <Grid item xs={1} sm={1} md={1} ><Item sx={{ boxShadow:0}}><div style={{textAlign:'center',fontSize:'15px', fontWeight:'bold'}}>{post.moveInfo.price / post.curNumberOfParty} 원</div></Item></Grid>
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="success">지불완료처리</Button></Item></Grid>
                    </Grid>
                    <Grid container justifyContent="start">
                        <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Subtitle sx={InputTitle}>운전자확인 상태</Subtitle></Item></Grid>
                        <Grid item xs={1} sm={1} md={1} ><Item sx={{ boxShadow:0}}></Item></Grid>
                        {
                            (!payChecked)? <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="error">정산미확인</Button></Item></Grid>
                                        : <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="primary">정산확인완료</Button></Item></Grid>
                        }
                    </Grid>
                </Grid>
                }
            </MainCard>
        </Grid>
      </>
      );
};
export default MyCarpoolDetailForCarpooler;
