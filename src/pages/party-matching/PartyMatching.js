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
  InputAdornment, CircularProgress
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

const partyInfoTitle = {
  fontSize: '1.0rem',
  fontWeight: 'bold',
};

const MatchStatusCode = {
  MATCHCANCEL: '매칭 취소',
  MATCHDENY: '신청 불가',
  MATCHAPPLY: '매칭 신청',
  MATCHSTART: '파티 시작',
  MATCHCLOSE: '파티 종료',
};

function checkUserMatchStatus(userMatchStatus) {
  if (userMatchStatus === 'WAITING' || userMatchStatus === 'ACCEPT') {
    return MatchStatusCode.MATCHCANCEL;
  } else if (userMatchStatus === 'DENY') {
    return MatchStatusCode.MATCHDENY;
  } else if (userMatchStatus === 'FORMED') {
    return MatchStatusCode.MATCHSTART;
  } else if (userMatchStatus === 'START') {
    return MatchStatusCode.MATCHCLOSE;
  } else {
    return MatchStatusCode.MATCHAPPLY;
  }
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

    // const matchResult = await getMatchInfo({ id });
    // const userResult = await getMatchUsers({ id, matchStatus }); //파티 정보 조회로 변경
    // setUserMatchStatus(matchResult.matchStatus);
    // setPartyInfo(partyResult);

    // if (userResult != 'undefined' && userResult != null) {
    //   setMatchUsers(userResult);
    // }
  }, []);

  const goPartyMemberDetailList = () => {
    navigate(`/party-member/${id}`);
  }; //파티 ID 넘겨주기

  const btnMatchClick = async () => {
    const data = {
      partyInfoId: id,
      userId: userInfo.userId,
    };

    const matchProcess = {
      partyInfoId: id,
      driverId: partyInfo.driver.userId, //현재 userID 넣어주기
    };

    //이거 로직이 조금 이상하긴 한데 그냥 일단 넘어가자
    //시작 전에만 파티 취소가 가능해야하는데 여긴 파티를 시작하고 취소가 가능하다.
    //파티 start가 누구한테 떨어지는건지 모르겠지만... 이것도 이상해..
    if (userMatchStatus === 'WAITING' || userMatchStatus === 'ACCEPT') {
      const cancelResult = await cancelMatch(data);
    } else if (userMatchStatus === 'DENY') {
      enqueueSnackbar('신청이 거절된 파티입니다.', {variant: 'error'});
    } else if (userMatchStatus === 'FORMED') {
      const startResult = await startParty(matchProcess);
    } else if (userMatchStatus === 'START') {
      const closeResult = await closeParty(matchProcess);
    } else {
      const applyResult = await applyParty(data);
    }
  };

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="파티 상세 정보">
            {isLoading ?
                <Box sx={{py: 3, minHeight: 150, alignContent: 'center'}}>
                  <CircularProgress />
                </Box>:
            <Grid container direction="row" spacing={3}>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>출발지</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={partyInfo.moveInfo.placeOfDeparture}
                      disabled={true}
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>목적지</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={partyInfo.moveInfo.destination}
                      disabled={true}
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>출발시간</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={moment(partyInfo.moveInfo.startDate).format('YYYY-MM-DD HH:mm:ss')}
                      disabled={true}
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>총 요금</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={partyInfo.moveInfo.price}
                      disabled={true}
                      aria-describedby="outlined-weight-helper-text"
                      endAdornment={<InputAdornment position="end">원</InputAdornment>}
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>차종</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={partyInfo.driver.carKind}
                      disabled={true}
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>차번호</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={partyInfo.driver.carNumber}
                      disabled={true}
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>거리</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={partyInfo.moveInfo.distance}
                      disabled={true}
                      variant="contained"
                      endAdornment={<InputAdornment position="end">km</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
              <Grid container xs={4} direction="row" alignItems="center" spacing={1}>
                <Grid lg={5} style={partyInfoTitle} justifyContent="flex-end" item direction="row">
                  <Box p={4}>탑승인원</Box>
                </Grid>
                <Grid lg={7} style={partyInfoTitle} justifyContent="flex-start" item direction="row">
                  <OutlinedInput
                      id="outlined-adornment-weight"
                      value={`${partyInfo.curNumberOfParty}/${partyInfo.maxNumberOfParty}`}
                      disabled={true}
                      variant="contained"
                      aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
              </Grid>
            </Grid>
            }
          </MainCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                {/* <Grid item>
                                    {<AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>{photoList}</AvatarGroup>}
                                </Grid> */}
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ width: '200px' }}
                    onClick={goPartyMemberDetailList}
                  >
                    파티 멤버 확인
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

      {/*<Grid container spacing={3}>*/}
      {/*  <Grid item xs={12} style={{ margin: '10px 0px 0px 0px' }}>*/}
      {/*    <MainCard title="이동 경로">*/}
      {/*      <Grid container spacing={3}>*/}
      {/*        <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>*/}
      {/*          <Box p={4}>출발지</Box>*/}
      {/*        </Grid>*/}
      {/*        <Grid item xs={6} sm={4} md={3} lg={2}>*/}
      {/*          <Box p={4}>API</Box>*/}
      {/*        </Grid>*/}
      {/*        <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>*/}
      {/*          <Box p={4}>도착지</Box>*/}
      {/*        </Grid>*/}
      {/*        <Grid item xs={6} sm={4} md={3} lg={2}>*/}
      {/*          <Box p={4}>API</Box>*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      {/*    </MainCard>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item>
          {
          <Button sx={{ mt: 2 }} variant="contained" onClick={btnMatchClick}>
            {checkUserMatchStatus(userMatchStatus)}
          </Button>
        }
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
};

export default PartyMatching;
