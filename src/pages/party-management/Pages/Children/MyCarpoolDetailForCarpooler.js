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

const MyCarpoolDetailForCarpooler = (props) => {
    console.log('MY Sub post',props.posts)
    const post = props.posts;
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
