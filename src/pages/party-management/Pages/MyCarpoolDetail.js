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
import queryString from'query-string';
import PropTypes from 'prop-types';
import AnimateButton from '../../../components/@extended/AnimateButton';
import MyCarpoolDetailForCarpooler from './MyCarpoolDetailForCarpooler';
import MyCarpoolDetailForDriver from './MyCarpoolDetailForDriver';
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


function ShadowBox({ shadow }) {
    return (
        <MainCard border={false} sx={{ boxShadow: shadow }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <Typography variant="h6">boxShadow</Typography>
                <Typography variant="subtitle1">{shadow}</Typography>
            </Stack>
        </MainCard>
    );
}

ShadowBox.propTypes = {
    shadow: PropTypes.string.isRequired
};

function DetailSubInfo(props) {
    const isDriver = props.isDriver;
    console.log('isDriver:',isDriver);
    if (isDriver) {
      return <MyCarpoolDetailForDriver />;
    }
    return <MyCarpoolDetailForCarpooler />;
  }

const MyCarpoolDetail = (props) => {
  console.log(AjaxUtils.BASE_URL);

  const [query, setQuery] = React.useState({id:0});
  const [post, setPost] = React.useState({partyInfoes:[]});
  const { type, isDriver } = queryString.parse(location.search);
  console.log(location);
  console.log(type);
    React.useEffect(() => {
      let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
      console.log(query);
      //query를 리턴하는 함수를 result에 할당
      async function get() {
        const result = await AjaxUtils.getPartyList(query);
        if (!completed) setPost(result);
      }
      get();
      return () => {
        completed = true;
      };
      //query가 변할때 useEffect를 실행해야하는 시점이다
    }, [query]); //input에 값이 변경이 되었을때 effect를 실행한다
    console.log(post, post.partyInfoes.length);
    const isEmpty = (post.partyInfoes.length === 0);
    console.log("isDriver:",isDriver)
      return (
      <>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
          { (type !== 'past') ? '진행 중인 카풀':'지난 카풀 내역'}
          <ManageSearchIcon fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
          </Typography>
        </Grid>

        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MainCard title="카풀 파티 정보">
                    <ListItem sx={{m:3,bgcolor:'#eee', width:'95%'}} value={0} onClick={(e) => setQuery(e.target.value)}>
                        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 12, sm:12,md:12}}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Paper
                                sx={{
                                margin: 'auto',
                                maxWidth: '100%',
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}
                            >
                                <Stack direction="row" spacing={2}>
                                <Subtitle sx={{width:'12%'}}>파티상태</Subtitle>
                                <Item sx={{boxShadow:0}}>
                                <Typography variant="h6" noWrap sx={{boxShadow:0}}>
                                    -- 명
                                </Typography>
                                </Item>
                                <Item sx={{fontSize:'1em', color:'#d11', fontWeight:'bold', boxShadow:0}}>
                                    --
                                </Item>
                                </Stack>
                            </Paper>
                            </Grid>
                            <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>출발지</Subtitle> </Grid>
                            <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>--</Item></Grid>
                            <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>출발시간</Subtitle></Grid>
                            <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>--</Item></Grid>
                            <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>차종</Subtitle></Grid>
                            <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>--</Item> </Grid>
                            <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>도착지</Subtitle></Grid>
                            <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>--</Item></Grid>
                            <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>거리</Subtitle></Grid>
                            <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>--</Item></Grid>
                            <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>차번호</Subtitle></Grid>
                            <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>--</Item></Grid>

                        </Grid>
                        </ListItem>

                    <Box sx={{m:3,p:3,bgcolor:'#eee'}}>
                        <Stack direction="row" spacing={2} justifyContent="center">
                        <Avatar sx ={{ width: 60, height: 60}}>
                        <BeachAccessIcon />
                        </Avatar>
                        <Avatar sx ={{ width: 60, height: 60}}>
                        <BeachAccessIcon />
                        </Avatar>
                        <Avatar sx ={{ width: 60, height: 60}}>
                        <BeachAccessIcon />
                        </Avatar>
                        <Avatar sx ={{ width: 60, height: 60}}>
                        <BeachAccessIcon />
                        </Avatar>
                        </Stack>
                    </Box>
                    </MainCard>
                </Grid>
                <DetailSubInfo isDriver={isDriver} />
            </Grid>
        </ComponentSkeleton>
      </>
      );
};
export default MyCarpoolDetail;
