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
import { timestamp, ConvertToYYYYMMDDhhmmsstoKor , ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './Children/EmptyList';
import { Demo,Item,Subtitle } from '../Utils/ComponentTheme';
import { getPartyInfoAllNow } from 'api/partymanagement';
import { useCallback, useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import SearchModal from './Children/SearchPopup';
import isEmptyObj from '../Utils/BasicUtils';


const SelectCarpoolList = () => {

  const [query, setQuery] = React.useState({condition:''});
  const [post, setPost] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  function handleCloseModal(data) {
    console.log('부모에서 받은',data);
    setQuery({
      // place : data._place,
      // date : data._dates,
      condition : data._condition
    });
  }
  console.log('query:',query);
    useEffect(async ()=>{
        await getPartyInfos(query);
    },[query]);
    const getPartyInfos = async (query)=>{
        await setIsLoading(true);

        const response = await getPartyInfoAllNow(query);
        let array = [];
        for(let index in response.data){
          array.push(response.data[index])
        }
        await setPost(!response.message ? array : []);
        await setIsLoading(false);
    }
    console.log(location.state.type)
    console.log(post);
    const isEmpty = isEmptyObj(post)||(post.length === 0);

    if(isEmpty || isLoading){
      console.log('isEmpty or isLoading')
        return (
        <>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
            카풀 차량 찾기
            <SearchModal/>
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

          <Grid item xs={12} md={6} >
              <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
              카풀 차량 찾기
              <SearchModal
                onCloseModal={handleCloseModal}
              />
            </Typography>
            <List>
            <Demo >
            {
              post.map((p, index)=>
                <ListItem sx={{m:3,bgcolor:'#eee', width:'95%'}} key={index} >
                <ListItemAvatar sx={{m:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
                  <Avatar sx ={{ width: 80, height: 80}}>
                    <BeachAccessIcon />
                  </Avatar>
                  <ListItemText primary="Manager" />
                </ListItemAvatar>
                  {/* 여기서 클릭 시 파티 매칭하는 화면으로 가야함 */}
                  <Link to={"/my-carpool-detail"}
                      style={{ textDecoration: 'none' ,width:'100%'}}
                      state={{
                        type:'now',
                        data:p
                      }}>
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
export default SelectCarpoolList;
