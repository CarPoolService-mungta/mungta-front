import * as React from 'react';
import { styled } from '@mui/material/styles';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AjaxUtils from 'utils/AjaxUtils';
import { ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './EmptyList';
import { Button, Stack, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding:15
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize : '80%'
  }));
  const Subtitle = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize:'80%',
    color:'#fff'
  }));

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
  console.log(AjaxUtils.BASE_URL);

  const [query, setQuery] = React.useState({id:0});
  const [post, setPost] = React.useState({partyInfoes:[]});

    React.useEffect(() => {
      let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
      console.log(query);
      //query를 리턴하는 함수를 result에 할당
      async function get() {
        const result = await AjaxUtils.getPartyList(query);
        if (!completed) setPost(result);
      }
      get();
      return () => {
        completed = true;
      };
      //query가 변할때 useEffect를 실행해야하는 시점이다
    }, [query]); //input에 값이 변경이 되었을때 effect를 실행한다
    console.log(post, post.partyInfoes.length);

    const isEmpty = (post.partyInfoes.length === 0);

    if(isEmpty){
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
            post.partyInfoes.filter(p => (p.status === 'STARTED' || p.status ==='CLOSED') ).map((p, index)=>

              <ListItem sx={{m:3,bgcolor:ListBgColor[p.status], width:'95%'}} key={index} >{/*(e) => setQuery(e.target.value)}>*/}

              <ListItemAvatar sx={{m:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
                <Avatar sx ={{ width: 80, height: 80}}>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText primary="Manager" />
              </ListItemAvatar>
              <Link to="/my-carpool-detail?type=past" style={{ textDecoration: 'none' }}>
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
