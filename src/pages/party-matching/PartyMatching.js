import PropTypes from 'prop-types';
import { useAsync, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatchInfo, applyParty, getMatchUsers } from 'api/partyMatching';
import UserPhoto from 'pages/party-matching/UserPhoto';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { isDirectiveLiteral } from '../../../../../Users/ljj56/AppData/Local/Microsoft/TypeScript/4.7/node_modules/@babel/types/lib/index';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

const partyInfoTitle = {
    fontSize: '1.0rem',
    fontWeight: 'bold'
};

function checkUserMatchStatus(userMatchStatus) {
    if (isDriver()) {
        return '파티 시작';
    } else {
        if (userMatchStatus === 'WAITING' || userMatchStatus === 'ACCEPT') {
            return '매칭 취소';
        } else if (userMatchStatus === 'DENY') {
            return '신청 불가';
        } else {
            return '매칭 신청';
        }
    }
}

function isDriver() {
    //드라이버 체크 로직
    return false;
}

// ============================|| COMPONENT - SHADOW ||============================ //

const PartyMatching = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [userMatchStatus, setUserMatchStatus] = useState(null);
    const [matchUsers, setMatchUsers] = useState(null);
    const [partyInfo, setPartyInfo] = useState(null);

    const photoList = matchUsers && matchUsers.map((user) => <UserPhoto userId={user.userId} curPhoto={user.curPhoto} />);

    useEffect(async () => {
        const partyInfoId = 2;
        const userId = 'lee1111';
        const matchStatus = 'WAITING';
        const matchResult = await getMatchInfo({ partyInfoId, userId });
        const partyResult = await getMatchInfo({ partyInfoId, userId }); //파티 정보 조회로 변경
        const userResult = await getMatchUsers({ partyInfoId, matchStatus }); //파티 정보 조회로 변경
        setUserMatchStatus(matchResult.matchStatus);
        setPartyInfo(partyResult);
        setMatchUsers(userResult);
    }, []);

    const goBackList = () => {
        navigate(`/party-member`);
    }; //파티 ID 넘겨주기

    const btnMatchClick = async () => {
        const data = {
            partyInfoId: 2,
            userId: 'lee1111'
        };

        if (userMatchStatus === 'WAITING' || userMatchStatus === 'ACCEPT') {
            const cancelResult = await cancelParty(data);
        } else if (userMatchStatus === 'DENY') {
            alert('신청 불가합니다.');
        } else {
            const applyResult = await applyParty(data);
        }
    };

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MainCard title="파티 상세 정보">
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>차종</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>출발시간</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>총 요금</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}원</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>차번호</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>거리</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}Km</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>탑승인원</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}명</Box>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MainCard sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Stack>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} noWrap>
                                            파티 신청 멤버
                                        </Typography>
                                        <Typography variant="caption" color="secondary" noWrap sx={{ mt: 2 }}>
                                            {<AvatarGroup sx={{ '& .MuiAvatar-root': { width: 42, height: 42 } }}>{photoList}</AvatarGroup>}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                {/* <Grid item>
                                    {<AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>{photoList}</AvatarGroup>}
                                </Grid> */}
                            </Grid>
                            <Grid container direction="row" justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button size="small" variant="contained" style={{ width: '200px' }} onClick={goBackList}>
                                        파티 멤버 확인
                                    </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </MainCard>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} style={{ margin: '10px 0px 0px 0px' }}>
                    <MainCard title="이동 경로">
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>출발지</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2} style={partyInfoTitle}>
                                <Box p={4}>도착지</Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Box p={4}>{userMatchStatus}</Box>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="center" spacing={2}>
                <Grid item>
                    <Button sx={{ mt: 2 }} variant="contained" onClick={btnMatchClick}>
                        {checkUserMatchStatus(userMatchStatus)}
                    </Button>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default PartyMatching;
