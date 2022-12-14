import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Button,
    Stack,
    Grid,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Box, CircularProgress
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { timestamp, ConvertToYYYYMMDDhhmmsstoKor , ConvertToYYYYMMDDhhmmtoKor} from '../Utils/DateUtils';
import EmptyList from './Children/EmptyList';
import { Demo,Item,Subtitle,ListBgColor,ListStatusDesc } from '../Utils/ComponentTheme';
import { getPartyInfoAllNow } from 'api/partymanagement';
import { useCallback, useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import SearchModal from './Children/SearchPopup';
import isEmptyObj from '../Utils/BasicUtils';

import dayjs from "dayjs";
const InputTitle = {
  backgroundColor: '#1A2027',
  padding: '2px',
  textAlign: 'center',
  color:'#fff',
  justifyContent: 'center',
  alignItems: 'center',
  height: '35px',
  border: '2px solid #1A2027',
  borderRadius:1,
  boxShadow: 10
}
const SelectCarpoolList = () => {

  const [query, setQuery] = React.useState({condition:''});
  const [post, setPost] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const onCloseModal = function handleCloseModal(data) {

    setQuery({
      departure : data._departure,
      destination : data._destination,
      start_date : dayjs(data._dates).format("YYYY-MM-DD"),
      condition : data._condition
    });
  };
    useEffect(async ()=>{
        await getPartyInfos(query);
    },[query]);
    const getPartyInfos = async (query)=>{
        await setIsLoading(true);

        const response = await getPartyInfoAllNow(query);
        let array = [];
        for(let index in response){
          array.push(response[index])
        }
        await setPost(!response.message ? array : []);
        await setIsLoading(false);
    }
    const isEmpty = isEmptyObj(post)||(post.length === 0);

    if(!isLoading && isEmpty){
        return (
        <>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
            ?????? ?????? ??????
            <SearchModal
              onCloseModal={onCloseModal}
            />
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
              ?????? ?????? ??????
              <SearchModal
                onCloseModal={onCloseModal}
              />
            </Typography>
            <List>
            <Demo >
            {isLoading?
                <Box sx={{py: 3, minHeight: 560, alignContent: 'center'}}>
                    <CircularProgress />
                </Box>
                :
              post.map((p, index)=>
                <ListItem sx={{m:3,bgcolor:'#eee', width:'95%'}} key={index} >
                <ListItemAvatar sx={{m:1, p:2, width:'10%', textAlign:'center',justifyContent: "center"}}>
                <div style={{textAlign:'center',fontWeight:'bold',fontSize:'90%'}}>[?????????]</div>
                  <Avatar sx ={{ textAlign:'center',width: 80, height: 80}}>
                    <BeachAccessIcon />
                  </Avatar>

                  <div style={{textAlign:'center',fontWeight:'bold',fontSize:'90%'}}>{p.driver.name}</div>
                  <div style={{textAlign:'center',fontWeight:'bold',fontSize:'55%'}}>Manager</div>
                </ListItemAvatar>

                  {/* ????????? ?????? ??? ?????? ???????????? ???????????? ????????? */}
                  <Link to={`/party-matching/${p.id}`}
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
                      <Subtitle sx={{width:'12%',p:1}}>????????????</Subtitle>
                      <Item sx={{boxShadow:0}}>
                      <Typography variant="h6" noWrap sx={{boxShadow:0}}>
                        {p.curNumberOfParty} / {p.maxNumberOfParty} ???
                      </Typography>
                      </Item>
                      <Item sx={{fontSize:'1em', color:'#d11', fontWeight:'bold', boxShadow:0}}>
                        {ListStatusDesc[p.status]}
                      </Item>
                      <Item sx={{fontSize:'1em', color:'#1cd', fontWeight:'bold', boxShadow:0}}>
                        ?????? ??? ?????? [ {'?????????'} ]
                      </Item>
                    </Stack>
                  </Paper>
                  </Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>?????????</Subtitle> </Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.moveInfo.placeOfDeparture}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>????????????</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{ConvertToYYYYMMDDhhmmtoKor(p.moveInfo.startDate)}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>??????</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.driver.carKind}</Item> </Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>?????????</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.moveInfo.destination}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>??????</Subtitle></Grid>
                    <Grid item xs={2.5} sm={2.5} md={2.5} ><Item>{p.moveInfo.distance}</Item></Grid>
                    <Grid item xs={1.5} sm={1.5} md={1.5} ><Subtitle sx={InputTitle}>?????????</Subtitle></Grid>
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
