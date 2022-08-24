import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AjaxUtils from 'utils/AjaxUtils';
import { timestamp, ConvertToYYYYMMDDhhmmsstoKor , ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './EmptyList';


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
    //...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize:'80%',
    color:'#fff'
    //color: theme.palette.text.secondary,
  }));
const SelectCarpoolList = () => {
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
          카풀 차량 찾기
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
              카풀 차량 찾기
              <ManageSearchIcon fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
            </Typography>
            <List>
            <Demo>

            {
              post.partyInfoes.map((p, index)=>
                <ListItem sx={{m:3,bgcolor:'#eee', width:'95%'}} value={index} onClick={(e) => setQuery(e.target.value)}>  {/*key={index}> onClick={(e) => setQuery(e.target.value) console.log('clicked',e.target.value)*/}
                <ListItemAvatar sx={{m:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
                  <Avatar sx ={{ width: 80, height: 80}}>
                    <BeachAccessIcon />
                  </Avatar>
                  <ListItemText primary="Manager" />
                </ListItemAvatar>
                <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 12, sm:12,md:12}}>
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
              </ListItem>
              )
            }
        {/* <ListItem sx={{m:3,bgcolor:'#eee', width:'95%'}} >  {/*key={index}>
          <ListItemAvatar sx={{m:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
            <Avatar sx ={{ width: 80, height: 80}}>
              <BeachAccessIcon />
            </Avatar>
            <ListItemText primary="Manager" />
          </ListItemAvatar>
          <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 12, sm:12,md:12}}>
              <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>출발지</Subtitle> </Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{post.partyInfoes.length>0 ? post.partyInfoes[0].moveInfo.placeOfDeparture: ''}</Item></Grid>
              <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>출발시간</Subtitle></Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{post.partyInfoes.length>0 ? ConvertToYYYYMMDDhhmmtoKor(post.partyInfoes[0].moveInfo.startDate): ''}</Item></Grid>
              <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>차종</Subtitle></Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{post.partyInfoes.length>0 ? post.partyInfoes[0].driver.carKind: ''}</Item> </Grid>
              <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>도착지</Subtitle></Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{post.partyInfoes.length>0 ? post.partyInfoes[0].moveInfo.destination: ''}</Item></Grid>
              <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>거리</Subtitle></Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{post.partyInfoes.length>0 ? post.partyInfoes[0].moveInfo.distance: ''}</Item></Grid>
              <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle>차번호</Subtitle></Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{post.partyInfoes.length>0 ? post.partyInfoes[0].driver.carNumber: ''}</Item></Grid>
          </Grid>
        </ListItem> */}
      </Demo>
      </List>
      </Grid>

          </>
      );
    }
};
export default SelectCarpoolList;
