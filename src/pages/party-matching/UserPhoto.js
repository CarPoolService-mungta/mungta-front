import React from 'react';

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

const UserPhoto = (props) => {
    return <Avatar key={props.userId} alt={props.curPhoto} src={avatar1} />; //경로 변경
};

export default UserPhoto;
