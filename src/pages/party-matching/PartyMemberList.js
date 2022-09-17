import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { getMatchUsers } from 'api/partyMatching';
import UserTable from 'pages/party-matching/UserTable';
import WaitTable from 'pages/party-matching/WaitTable';
import DataTable from 'components/@extended/DataTable';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';

// assets
import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { TableRow } from '../../../node_modules/@mui/material/index';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem',
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none',
};

const columns = [
  {
    id: 'userId',
    label: '사용자명',
    width: 290,
    align: 'left',
  },
];

function isDriver() {
    return true;
}

const PartyMemberList = () => {
  const theme = useTheme();

  const [userResult, setUserResult] = useState(null);
  const [waitResult, setWaitResult] = useState(null);

  const acceptList =
    userResult &&
    userResult.map((user) => (
      <UserTable
        userId={user.userId}
        curPhoto={user.curPhoto}
        userTeamName={user.userTeamName}
        content={user.content}
        reviewScore={user.reviewScore}
      />
    ));
  const nameList =
    waitResult &&
    waitResult.map((user) => (
      <WaitTable
        userId={user.userId}
        curPhoto={user.curPhoto}
        userTeamName={user.userTeamName}
        content={user.content}
        reviewScore={user.reviewScore}
      />
    ));

  useEffect(async () => {
    const partyInfoId = 2;
    const matchStatus = 'WAITING';
    const matchResult = await getMatchUsers({ partyInfoId, matchStatus });
    setWaitResult(matchResult);
  }, []);

  useEffect(async () => {
    const partyInfoId = 2;
    const matchStatus = 'ACCEPT';
    const matchResult = await getMatchUsers({ partyInfoId, matchStatus });
    setUserResult(matchResult);
  }, []);

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item sx={{ mt: 2 }}>
          <Typography variant="h5">파티 확정 멤버</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': {
                    ...actionSX,
                    position: 'relative',
                  },
                },
              }}
            >
              {acceptList}
            </List>
          </MainCard>
        </Grid>
      </Grid>

      {isDriver() && <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item sx={{ mt: 2 }}>
          <Typography variant="h5">파티 요청 멤버</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': {
                    ...actionSX,
                    position: 'relative',
                  },
                },
              }}
            >
              {nameList}
            </List>
          </MainCard>
        </Grid>
      </Grid>}
    </ComponentSkeleton>
  );
};

export default PartyMemberList;
