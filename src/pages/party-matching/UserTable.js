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
import {LoadingButton} from "@mui/lab";

const UserTable = ({userName, userTeam, userPhoto, scoreAvg, comment, isWaitingMembers=false}) => {

    const navigate = useNavigate();

    //Todo 변경
    const goReviewDetail = (params, e) => {
        // const userId = params.userId;
        // navigate('/party-matching'); //주소 변경
    };

    return (
        <ListItemButton
            divider
            onClick={(e) => {
                goReviewDetail(props, e);
            }}
        >
            <ListItemAvatar>
                <Avatar src={userPhoto} />
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">{userName}</Typography>} secondary={userTeam} />
            <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                        {`평점 : ${Math.round(scoreAvg*10)/10}`}
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                        {`최근 코멘트: ${comment ? comment : '-'}`}
                    </Typography>
                    {isWaitingMembers ?
                        <Grid direction="row" alignItems="flex-end" spacing={1}>
                            <LoadingButton
                                variant="contained"
                                style={{margin: 1}}
                            >
                                수락
                            </LoadingButton>
                            <LoadingButton
                                variant="contained"
                                style={{margin: 1}}
                                color="error">
                                거절
                            </LoadingButton>
                        </Grid>
                        :<></>
                    }
                </Stack>
            </ListItemSecondaryAction>
        </ListItemButton>
    );
};

export default UserTable;
