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
import {Demo,Item,Subtitle} from '../Utils/ComponentTheme';
import {getPartyInfoAllNow} from 'api/partymanagement';
import {useCallback, useEffect, useState} from "react";

function isEmptyObj(obj)  {
  if(obj.constructor === Object
     && Object.keys(obj).length === 0)  {
    return true;
  }

  return false;
}

const SelectCarpoolList = () => {
  console.log(AjaxUtils.BASE_URL);

  const [query, setQuery] = React.useState({condition:''});
//  const [post, setPost] = React.useState({partyInfoes:[]});
  const [post, setPost] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
    // React.useEffect(() => {
    //   let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
    //   console.log('query:',query);
    //   //query를 리턴하는 함수를 result에 할당
    //   async function get() {
    //     const result = await AjaxUtils.getPartyList(query);
    //     // const result = await getPartyInfoAllNow(query);
    //     console.log('result:',result.data);
    //     let array = [];
    //     for(let index in result.data){
    //       array.push(result.data[index])
    //     }
    //     if (!completed) setPost(array);
    //   }
    //   get();
    //   return () => {
    //     completed = true;
    //   };
    //   //query가 변할때 useEffect를 실행해야하는 시점이다
    // }, [query]); //input에 값이 변경이 되었을때 effect를 실행한다
    // console.log(post, post.length, typeof(post));
    useEffect(async ()=>{
        await getPartyInfos();
    },[query]);

    const getPartyInfos = async ()=>{
        await setIsLoading(true);

        const response = await getPartyInfoAllNow(query);
        console.log("도대체 뭘가져오는거야?",response)
        let array = [];
        for(let index in response.data){
          array.push(response.data[index])
        }
        await setPost(!response.message ? array : []);
        await setIsLoading(false);
    }

    // console.log('post:',post, post.length);

    // console.log('post.data',post.data,post.data.length);
    const isEmpty = isEmptyObj(post)||(post.length === 0);
    // console.log('isEmpty',isEmpty,' isloading',isLoading);
    if(isEmpty || isLoading){
      console.log('여기')
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

          <Grid item xs={12} md={6} >
              <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
              카풀 차량 찾기
              <ManageSearchIcon fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
            </Typography>

            <List>
            <Demo >

            {
              post.map((p, index)=>
                <ListItem sx={{m:3,bgcolor:'#eee', width:'95%'}} value={index} onClick={(e) => setQuery(e.target.value)}>
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
          </Demo>
          </List>
          </Grid>

          </>
      );
    }
};
export default SelectCarpoolList;
