import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import MainCard from 'components/MainCard';
import { Breadcrumbs, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    background: {
        primary: '#03a9f4',
        secondary: '#ff9800',
    },
    text: {
      primary: '#FFF',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

const clickMe = (event) => {
    alert(event);
  }
//</>onClick={()=> alert('운전자!')}>component={RouterLink} to="/questions"
const driverCard = (
    <>
        <CardActionArea component={Link} to="/create-party">
        <CardContent>
            <Typography variant="h3" align="center" sx={{color:'white'}}>
                운전자
            </Typography>
        </CardContent>
        </CardActionArea>
    </>
);
const carpoolerCard = (
    <>
        <CardActionArea component={Link} to="/select-carpool-list">
        <CardContent>
            <Typography variant="h3" align="center" sx={{color:'white'}}>
                카풀러
            </Typography>
        </CardContent>
        </CardActionArea>
    </>
);
const SelectRole = () => {
    return (
        <div style={{margin: 'auto'}}>
        <ThemeProvider theme={theme} >
            <Grid container justifyContent="center"
                    alignItems="center" spacing={6} align="center" justify="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 100px)', md: 'calc(100vh - 100px)' } }}>
                <Grid xs={2}></Grid>
                <Grid xs={4}>
                    <Card sx={{
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 11,
                        m: 2,
                        minHeight: { xs: 'calc(100vh-100px)', md: 'calc(100vh-100px)'  },
                        bgcolor:'background.primary'
                        }} variant="outlined" >{driverCard}</Card>
                </Grid>
                <Grid xs={4}>
                    <Card  sx={{
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 11,
                        m: 2,
                        minHeight: { xs: 'calc(100vh-100px)', md: 'calc(100vh-100px)' },
                        bgcolor:'background.secondary'
                        }} variant="outlined">{carpoolerCard}</Card>
                </Grid>
                <Grid xs={2}></Grid>
            </Grid>
            </ThemeProvider>
        </div>
    );
};

/*
export default function SelectRole() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.primary',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ bgcolor: 'text.secondary' }}>Sessions</Box>
        <Box sx={{ bgcolor: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          98.3 K
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          vs. last week
        </Box>
      </Box>
    </ThemeProvider>
  );
}*/
export default SelectRole;
