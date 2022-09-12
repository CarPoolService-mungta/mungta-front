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
import {Demo,Item,Subtitle} from '../../Utils/ComponentTheme';

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
                          <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Subtitle>{p.name}</Subtitle></Item></Grid>
                          <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="success">정산확인</Button></Item></Grid>
                          <Grid item xs={2} sm={2} md={2} ><Item sx={{ boxShadow:0}}><Button variant="contained" color="error">정산미확인</Button></Item></Grid>
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
