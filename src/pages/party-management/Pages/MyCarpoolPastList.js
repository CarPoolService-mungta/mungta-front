import * as React from 'react';
import { styled } from '@mui/material/styles';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './EmptyList';
import { Button, Stack, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Link,useLocation  } from 'react-router-dom';
import {Demo,Item,Subtitle} from '../Utils/ComponentTheme';
import { getPartyInfoPastMyNow } from 'api/partymanagement';
import isEmptyObj from '../Utils/BasicUtils';
const ListBgColor = {
  OPEN : '#B8FEFF',
  FULL : '#FF7B7B',
  STARTED : '#FFE67B',
  CLOSED : '#626262'
}
const ListStatusDesc = {
  OPEN : '신청 가능',
  FULL : '신청 마감',
  STARTED : '카풀 진행 중',
  CLOSED : '종료'
}

const MyCarpoolPastList = () => {

  const [query, setQuery] = React.useState({user_id:'3'});
  const [post, setPost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();

  React.useEffect(async ()=>{
      await getPartyInfos();
  },[query]);

  const getPartyInfos = async ()=>{
      await setIsLoading(true);

      const response = await getPartyInfoPastMyNow(query);
      let array = [];
      for(let index in response.data){
        array.push(response.data[index])
      }
      await setPost(!response.message ? array : []);
      await setIsLoading(false);
  }
  const isEmpty = isEmptyObj(post)||(post.length === 0);

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
          지난 카풀 내역
          <ManageSearchIcon fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
        </Typography>
        <List>
        <Demo>
        {
          //post.partyInfoes.filter(p => (p.status ==='CLOSED') ).map((p, index)=>
          post.map((p, index)=>
            <ListItem sx={{m:3,bgcolor:ListBgColor[p.status], width:'95%'}} key={index} >{/*(e) => setQuery(e.target.value)}>*/}

            <ListItemAvatar sx={{m:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
              <Avatar sx ={{ width: 80, height: 80}}>
                <BeachAccessIcon />
              </Avatar>
              <ListItemText primary="Manager" />
            </ListItemAvatar>
            <Link to="/my-carpool-detail"
                  style={{ textDecoration: 'none' }}
                  state={{
                    type:'past',
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
                <Grid item xs={12} sm={12} md ={12} sx={{border:0, boxShadow:0}}>
                  <Item spacing={2} sx={{border:0, boxShadow:0, bgcolor:ListBgColor[p.status]}}>
                    <Button variant="contained" color="primary" sx={{m:1}}>리뷰하기</Button>
                    <Button variant="contained" color="error" sx={{m:1}}>신고하기</Button></Item>
                </Grid>

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
export default MyCarpoolPastList;
