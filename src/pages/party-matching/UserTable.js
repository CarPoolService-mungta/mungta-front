import React from 'react';

import { getMatchUsers } from 'api/partyMatching';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';

const UserTable = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const goReviewDetail = (params, e) => {
        const userId = params.userId;
        navigate('/party-matching'); //주소 변경
    };

    // const nameList = userInfo && userInfo.map((name) => <UserTable userId={name.userId} />);

    useEffect(async () => {
        const partyInfoId = 11;
        const matchStatus = 'WAITING';
        const userResult = await getMatchUsers({ partyInfoId, matchStatus });
        setUserInfo(userResult);
    }, []);

    return (
        <ListItemButton
            divider
            onClick={(e) => {
                goReviewDetail(props, e);
            }}
        >
            <ListItemAvatar>
                <Avatar alt="curp" src={avatar1} />
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">{props.userId}</Typography>} secondary={props.userTeamName} />
            <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                        {props.content}
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                        {props.reviewScore}
                    </Typography>
                </Stack>
            </ListItemSecondaryAction>
        </ListItemButton>
    );
};

export default UserTable;
