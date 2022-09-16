import * as React from 'react';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
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
const MyCarpoolDetailForDriver = (props) => {
  console.log('MY Sub post',props.posts)
  const post = props.posts;
      return (
      <>

        <Grid item xs={12}>
              <MainCard title="지불요금" codeHighlight>
                  <Grid container spacing={3} wrap="nowrap">
                      <Grid item xs={12} sm={12} md={12} lg={12} >
                        <Demo>
                          <Stack direction="row" spacing={2}>
                            <Typography>금액</Typography>
                            <Typography>{post.moveInfo.price}원 ({post.curNumberOfParty}명) </Typography>
                            <Typography>=&gt; {post.moveInfo.price/post.curNumberOfParty}원</Typography>
                          </Stack>
                        </Demo>
                      </Grid>
                  </Grid>
              </MainCard>

          </Grid>

        <Grid item xs={12}>
            <MainCard title="정산내역" codeHighlight>
                <Grid>
                  <Demo>
                  {
                      post.carPooler.map((p,index)=>
                      <Grid container justifyContent="start" key={index}>
                          <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Subtitle sx={InputTitle}>{p.name}</Subtitle></Item></Grid>
                          {
                            (p.driverCheck==='PAID')?
                            <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="success"onClick={()=>alert('정산확인이 완료되었습니다')}>정산확인완료</Button></Item></Grid>
                            :
                            <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="error" onClick={()=>alert('정산확인요청 보내기')}>정산확인요청</Button></Item></Grid>
                          }
                      </Grid>
                      )
                  }
                  </Demo>
                </Grid>
            </MainCard>
        </Grid>
      </>
      );
};
export default MyCarpoolDetailForDriver;
