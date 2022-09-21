import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  getMatchInfo,
  applyParty,
  getMatchUsers,
  cancelMatch,
  startParty,
  closeParty, getPartyMemberSummary,
} from 'api/partyMatching';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  AvatarGroup,
  Box,
  Button,
  Grid, OutlinedInput,
  Stack,
  Typography,
  InputAdornment, CircularProgress, ListItem, Paper
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import {getPartyInfo} from "api/partymanagement";
import CustomError from "utils/CustomError";
import {useSnackbar} from "notistack";
import moment from 'moment';
import UserPhoto from './UserPhoto'
import {useSelector} from "react-redux";
import ButtonContainer from "../review-management/ButtonContainer";
import {Item, ListStatusDesc, Subtitle} from "../party-management/Utils/ComponentTheme";
import {ConvertToYYYYMMDDhhmmsstoKor} from "../party-management/Utils/DateUtils";
import * as React from "react";

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
  boxShadow: 10
}

const initPartyInfo = {
  curNumberOfParty:0,
  maxNumberOfParty:0,
  moveInfo: {
    placeOfDeparture:'',
    destination:'',
    startDate:'',
    price:'',
    distance:'',
  },
  driver:{
    carNumber:'',
    carKind:''
  }
}

const PartyMatching = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {id} = useParams();

  const [userMatchStatus, setUserMatchStatus] = useState(null);
  const [matchUsers, setMatchUsers] = useState(null);
  const [partyInfo, setPartyInfo] = useState(initPartyInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMember,setIsLoadingMember] = useState(false);
  const userInfo   = useSelector(state =>  state.userInfo );

  const searchPartyInfo = async ()=>{
    setIsLoading(true);
    const partyInfoResponse = await getPartyInfo({id});
    if(partyInfoResponse instanceof CustomError){
      enqueueSnackbar(partyInfoResponse.message, {variant: 'error'});
    }else{
      setPartyInfo(partyInfoResponse);
    }
    setIsLoading(false);
  }

  const searchPartyMembersSummary= async ()=>{
    setIsLoadingMember(true);
    const partyMemberResponse = await getPartyMemberSummary({partyInfoId: id});
    if(partyMemberResponse instanceof CustomError){
      enqueueSnackbar(partyMemberResponse.message, {variant: 'error'});
    }else{
      setMatchUsers(partyMemberResponse.userResponses);
      setUserMatchStatus(partyMemberResponse.matchStatus);
    }
    setIsLoadingMember(false);
  }

  useEffect(() => {
    searchPartyInfo();
    searchPartyMembersSummary();
  }, []);

  const goPartyMemberDetailList = () => {
    navigate(`/party-member`,{
      state: {
        partyInfo: partyInfo
      }
    });
  }; //파티 ID 넘겨주기

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="파티 상세 정보">
            {isLoading ?
                <Box sx={{py: 3, minHeight: 150, alignContent: 'center'}}>
                  <CircularProgress />
                </Box>:
            // <Grid container direction="row" spacing={3}>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>출발지</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={partyInfo.moveInfo.placeOfDeparture}
            //           disabled={true}
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>목적지</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={partyInfo.moveInfo.destination}
            //           disabled={true}
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>출발시간</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={moment(partyInfo.moveInfo.startDate).format('YYYY-MM-DD HH:mm:ss')}
            //           disabled={true}
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>총 요금</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={partyInfo.moveInfo.price}
            //           disabled={true}
            //           aria-describedby="outlined-weight-helper-text"
            //           endAdornment={<InputAdornment position="end">원</InputAdornment>}
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>차종</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={partyInfo.driver.carKind}
            //           disabled={true}
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>차번호</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={partyInfo.driver.carNumber}
            //           disabled={true}
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>거리</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={partyInfo.moveInfo.distance}
            //           disabled={true}
            //           variant="contained"
            //           endAdornment={<InputAdornment position="end">km</InputAdornment>}
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            //   <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
            //     <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
            //       <Box p={4}>탑승인원</Box>
            //     </Grid>
            //     <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
            //       <OutlinedInput
            //           id="outlined-adornment-weight"
            //           value={`${partyInfo.curNumberOfParty}/${partyInfo.maxNumberOfParty}`}
            //           disabled={true}
            //           variant="contained"
            //           aria-describedby="outlined-weight-helper-text"
            //       />
            //     </Grid>
            //   </Grid>
            // </Grid>
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
                          <Subtitle sx={{width:'12%',p:1}}>파티상태</Subtitle>
                          <Item sx={{boxShadow:0}}>
                            <Typography variant="h6" noWrap sx={{boxShadow:0}}>
                              {partyInfo.curNumberOfParty} / {partyInfo.maxNumberOfParty} 명
                            </Typography>
                          </Item>
                          <Item sx={{fontSize:'1em', color:'#d11', fontWeight:'bold', boxShadow:0}}>
                            {ListStatusDesc[partyInfo.status]}
                          </Item>
                          <Item sx={{fontSize:'1em', color:'#1cd', fontWeight:'bold', boxShadow:0}}>
                            [ {userInfo.userId==partyInfo.driver.userId?'운전자':'카풀러'} ]
                          </Item>
                        </Stack>
                      </Paper>
                    </Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>출발지</Subtitle> </Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{partyInfo.moveInfo.placeOfDeparture}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>출발시간</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{moment(partyInfo.moveInfo.startDate).format('YYYY-MM-DD HH:mm:ss')}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>차종</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{partyInfo.driver.carKind}</Item> </Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>도착지</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{partyInfo.moveInfo.destination}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>거리</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{partyInfo.moveInfo.distance}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>차번호</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{partyInfo.driver.carNumber}</Item></Grid>

                  </Grid>
                </ListItem>
            }
          </MainCard>
        </Grid>
      </Grid>

      <MainCard sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Stack>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} noWrap>
                  파티 신청 멤버
                </Typography>
                <br/>
                {isLoadingMember ?
                    <Box sx={{py: 3, minHeight: 150, alignContent: 'center'}}>
                      <CircularProgress/>
                    </Box> :
                    <AvatarGroup
                        sx={{
                          '& .MuiAvatar-root': {width: 100, height: 100},
                        }}
                    >
                      {matchUsers &&
                          matchUsers.map((user) => (
                              <>
                                <UserPhoto userId={user.userId}
                                           userPhoto={user.userPhoto}
                                           fileExtension={user.fileExtension}
                                           userName={user.userName}
                                           userTeam={user.userTeamName}
                                           isDriver={user.userId==partyInfo.driver.userId}/>

                              </>
                          ))}
                    </AvatarGroup>
                }
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
          >
              <Button
                size="small"
                variant="contained"
                style={{ width: '200px' }}
                onClick={goPartyMemberDetailList}
              >
                파티 멤버 확인
              </Button>
          </Grid>
        </Stack>
      </MainCard>


      <Grid direction="row" justifyContent="center" spacing={2} style={{marginTop:30}}>
        {!isLoadingMember ?
            <ButtonContainer partyInfo={partyInfo} userId={userInfo.userId} matchStatus={userMatchStatus}/>
            : <></>
        }
      </Grid>
    </>
  );
};

export default PartyMatching;
