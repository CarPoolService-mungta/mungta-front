import { styled } from '@mui/material/styles';
import { Button, Stack, Box, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
export const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding:15
  }));

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize : '80%'
  }));
export const Subtitle = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize:'80%',
    color:'#fff'
  }));
