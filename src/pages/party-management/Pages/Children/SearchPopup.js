import React, {useState} from 'react';

import { styled } from '@mui/material/styles';
import {  TextField,Modal, Stack, Box, Grid,Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import {Demo,Item,Subtitle} from '../../Utils/ComponentTheme';

import BasicDateTimePicker from '../../Utils/BasicDateTimePicker';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
const style = {
    // position: 'relative',
    // width: '70%',
    // height: '70%',

    // top: '20%',
    // left: '20%',
    // right: '20%',
    // bottom: '20%',

    // transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: 4,
  };
  const InputTitle = {
    backgroundColor: '#1A2027',
    padding: '2px',
    margin:'5px',
    textAlign: 'center',
    color:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    border: '2px solid #1A2027',
    borderRadius:1,
    boxShadow: 10
  }
const InputItem = {
    backgroundColor: '#fff',
    padding: '2px',
    margin:'5px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    border: '2px solid #fff',
    borderRadius:1,
    boxShadow: 10
  }
const LineHr = {
    width:'90%',
    height:'1px',
    backgroundColor:'#000'
}

const ButtonItem = {
    backgroundColor: '#777',
    padding: '2px',
    margin:'5px',
    border: '2px solid #777',
    borderRadius:3,
    boxShadow: 10,
    textDecoration:'none',
    color:'#ddd'
  }
  const ButtonClickedItem = {
    backgroundColor: '#ddd',
    padding: '2px',
    margin:'5px',
    border: '2px solid #ddd',
    borderRadius:3,
    boxShadow: 10,
    textDecoration:'none',
    color:'#d11'
  }
const SearchModal = (props) => {
 // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [place, setPlace] = useState();
    const [startDateValue, setStartDateValue] = useState(new Date());
    const [filter, setFilter] = useState({_condition:'',_date:'',_place:''});

    const openModal = () => {
        setModalOpen(true);
        setFilter(()=>({_condition:'',_date:startDateValue,_place:''}));
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const onSelectDistance = () => {
        setFilter(()=>({
            _dates: startDateValue,
            _place: place,
            _condition: 'distance'
        }));
    }
    const onSelectReview = () => {
        setFilter(()=>({
            _dates: startDateValue,
            _place: place,
            _condition: 'review_average_score'
        }));
    }
    const onSelectTime = () => {
        setFilter(()=>({
            _dates: startDateValue,
            _place: place,
            _condition: 'start_date'
        }));
    }

    const dataToParent = () => {

        setFilter(()=>({
            _dates: startDateValue,
            _place: place,
        }))
        console.log('search popup의 filter',filter);
        props.onCloseModal(filter);
        setModalOpen(false);
    }
    return (
        <>
            <ManageSearchIcon onClick={openModal} fontSize="large" sx={{ float: 'right', m:2 }}></ManageSearchIcon>
            <Modal sx={{width:"450px",height:"400px",margin:'auto'}} open={modalOpen} close={closeModal}>

            <Box sx={style}>

            <div sx={{padding:"5px"}}>
           <Grid container >
                <Grid item xs={12} sm={12} md={12} >
                    <div style={{width:"100%",height:"35px",backgroundColor:"#1A2027",color:"#FFF",padding:"5px"}}>검색 조건</div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} ><br/></Grid>
                <Grid item xs={1} sm={1} md={1} ></Grid>
                <Grid item xs={2} sm={2} md={2} sx={InputTitle}>
                    <div style={{marginTop:"10px"}}>지역</div></Grid>
                <Grid item xs={8} sm={8} md={8} sx={InputItem}>
                    <input name="place" onChange={(e)=>{setPlace(e.target.value)}}></input>
                </Grid>

                <Grid item xs={1} sm={1} md={1} ></Grid>
                <Grid item xs={2} sm={2} md={2} sx={InputTitle}>
                    <div style={{marginTop:"10px"}}>날짜</div>
                </Grid>
                <Grid item xs={8} sm={8} md={8} sx={InputItem}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    renderInput={(props) => <TextField {...props} sx={{border:'none'}} />}
                    value={startDateValue}
                    inputFormat={"yyyy-MM-dd"}
                    onChange={(newValue) => {setStartDateValue(newValue);}}
                />
                </LocalizationProvider>

                </Grid>

                <Grid item xs={12} sm={12} md={12} ><br/></Grid>
                <Grid item xs={1} sm={1} md={1} ></Grid>
                <Grid item xs={10} sm={10} md={10} sx={LineHr}></Grid>
                <Grid item xs={1} sm={1} md={1} ></Grid>
                <Grid item xs={12} sm={12} md={12} ><br/></Grid>

                <Grid item xs={12} sm={12} md={12} align="center">
                    <Button sx={filter._condition=='distance'?ButtonClickedItem:ButtonItem} onClick={onSelectDistance}>거리 순</Button>
                    <Button sx={filter._condition=='review_average_score'?ButtonClickedItem:ButtonItem} onClick={onSelectReview}>리뷰점수 순</Button>
                    <Button sx={filter._condition=='start_date'?ButtonClickedItem:ButtonItem} onClick={onSelectTime}>시간 순</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{m:2}}
                        onClick={dataToParent}
                        >적용</Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{m:2}}
                        onClick={closeModal}>취소</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} ><br/></Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <div style={{width:"100%",height:"25px",backgroundColor:"#1A2027"}}></div>
                </Grid>
            </Grid>
            </div>
            </Box>
            </Modal>
        </>
    );
}

export default SearchModal;
