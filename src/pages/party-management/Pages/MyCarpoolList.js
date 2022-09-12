import * as React from 'react';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './Children/EmptyList';
import {  Stack, Box, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Link,useSearchParams,useLocation } from 'react-router-dom';
import { getPartyInfoMyNow } from 'api/partymanagement';
import isEmptyObj from '../Utils/BasicUtils';
import {Demo,Item,Subtitle,ListBgColor,ListStatusDesc} from '../Utils/ComponentTheme';

const MyCarpoolList = () => {

  const [query, setQuery] = React.useState({user_id:'3'});
  const [post, setPost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();

    React.useEffect(async ()=>{
        await getPartyInfos();
    },[query]);

    const getPartyInfos = async ()=>{
        await setIsLoading(true);

        const response = await getPartyInfoMyNow(query);
        let array = [];
        for(let index in response.data){
          array.push(response.data[index])
        }
        await setPost(!response.message ? array : []);
        await setIsLoading(false);
    }

    console.log('post:',post, post.length);

    // console.log('post.data',post.data,post.data.length);
    const isEmpty = isEmptyObj(post)||(post.length === 0);
    // console.log('isEmpty',isEmpty,' isloading',isLoading);
    if(isEmpty || isLoading){
      return (
      <>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
          진행 중인 카풀
          <ManageSearchIcon fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
          </Typography>
          <EmptyList/>
        </Grid>
      </>
      )
    }
    else
    {
      return (
      <>
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
            진행 중인 카풀
            <ManageSearchIcon fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
          </Typography>
          <List>
          <Demo>
          {
            // post.partyInfoes.filter(p => (p.status === 'OPEN' || p.status ==='FULL' || p.status === 'STARTED') ).map((p, index)=>
            post.map((p, index)=>
            <ListItem sx={{m:3,bgcolor:ListBgColor[p.status], width:'95%'}} key={index} >
              <ListItemAvatar sx={{m:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
                <Avatar sx ={{ width: 80, height: 80}}>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText primary="Manager" />
              </ListItemAvatar>
              <Link to={"/my-carpool-detail"}
                    style={{ textDecoration: 'none' }}
                    state={{
                      type:'now',
                      data:p
                    }}>
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
                        {p.curNumberOfParty} / {p.maxNumberOfParty} 명
                      </Typography>
                      </Item>
                      <Item sx={{fontSize:'1em', color:'#d11', fontWeight:'bold', boxShadow:0}}>
                        {ListStatusDesc[p.status]}
                      </Item>
                    </Stack>
                  </Paper>
                  </Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>출발지</Subtitle> </Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.moveInfo.placeOfDeparture}</Item></Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>출발시간</Subtitle></Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{ConvertToYYYYMMDDhhmmtoKor(p.moveInfo.startDate)}</Item></Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>차종</Subtitle></Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.driver.carKind}</Item> </Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>도착지</Subtitle></Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.moveInfo.destination}</Item></Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>거리</Subtitle></Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.moveInfo.distance}</Item></Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>차번호</Subtitle></Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.driver.carNumber}</Item></Grid>
              </Grid>
              </Link>
              </ListItem>
              )
            }
            </Demo>
            </List>
          </Grid>
        </>
      );
    }
};
export default MyCarpoolList;
