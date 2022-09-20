import React, { useState, useRef,useEffect,useCallback } from 'react';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import {Link,Button,Container,Avatar,Typography,Grid,Stack,InputLabel} from '@material-ui/core';
import {useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getPhotoByUserId} from 'api/user'
import CustomError from 'utils/CustomError';
import { init,send } from 'emailjs-com';
import { useSnackbar } from 'notistack';


const avartarStyle = {
height: "20vh",
width : "10vw",
marginLeft: 100,
marginBottom: 20,
}
const letterStyle = {
  color: '#808080',
  marginLeft: 55,
}
const linkStyle = {
  cursor : 'pointer',
  underline: 'always'
}

const Mypage = () => {

  const userInfo   = useSelector(state =>  state.userInfo );

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  // const [dataUrlmage   , setdataUrlmage]    = useState(null);
  //  const imgRef   = useRef(null);
  // useEffect(async ()=>{await viewPhoto()},[]);
  // let dataUrlmagetmp ='';
  // const viewPhoto = async ()=>{
  //     await setIsLoading(true);
  //     const response = await getPhotoByUserId(userInfo.userId)
  //     if(response instanceof CustomError){
  //       return;
  //     }else{
  //       const str1='data:image/';
  //       const str2=response.fileExtension;;
  //       const str3=';base64,';
  //       const str4=response.userPhoto;
  //       dataUrlmagetmp =str1+str2+str3+str4;
  //     }
  //     await setdataUrlmage(dataUrlmage => dataUrlmagetmp);
  //     await setIsLoading(false);
  // };
  //<input  type='file' style={{display:'none'}} accept='image/jpg,impge/png,image/jpeg' name='profileImg' ref={imgRef} />

  const goUpdate = () => {
    // navigate(`/update-user-info/${userInfo.userId}`);
    navigate(`/update-user-info`);
  };

  const goCarpool = () => {
    navigate('/party-management')
  };
  const goReview = () => {

    navigate('/my-review')
  };
  const goAccuse = useCallback((e) => {

    navigate('/accusations')
  }, []);
  const goQuestion = () => {
    navigate('/question/post')
  };

  const deleteUser = () => {
    alert("회원탈퇴");
  }
  const sendEmail = (e) => {

    init('mungta');
    let formData = new FormData();
    formData.append("subject"     , '관리자회원신청');
    formData.append("email_from"  , userInfo.email);
    formData.append("email_to"    , 'mungtaservice@gmail.com');
    formData.append("name"        , userInfo.userName);
    formData.append("message"     , '관리자회원을 신청합니다.');

    send('-', '-', formData);
    enqueueSnackbar('관리자회원 신청이 완료되었습니다. ', {variant: 'success'});

  };

  return (
    <MainCard darkTitle={true}  title="Mypage" >
      <Box sx={{ alignSelf: 'center',maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, }}>
        <Container align="left" sx={{ margin: 1 }} >
          <Avatar src={userInfo.userPhoto} style = {avartarStyle}></Avatar>
          <Typography  variant="h3">
            {userInfo.userName}님 환영합니다.
          </Typography>
        </Container>
        <Container>
          <Button type="submit"  sx={{ width: 148, padding: 1, margin: 1 }} variant="contained" color="primary" onClick={goUpdate}>회원정보수정</Button>
          <Button type="submit" sx={{ width: 148, padding: 1, margin: 1 }} variant="contained" color="primary" onClick={goQuestion}>문의사항등록</Button>
        </Container>
        <p></p>
        <div className="Mypage-detail">
        <ul><Link to="/party"  variant="h3" style = {linkStyle} onClick={goCarpool}>카풀신청하기</Link></ul>
        <ul><Link to="/review" variant="h3" style = {linkStyle} onClick={goReview}>리뷰보기</Link></ul>
        <ul><Link to="/accuse" variant="h3" style = {linkStyle} onClick={goAccuse}>신고내역보기</Link></ul>
        </div>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={3}>
            <InputLabel onClick={deleteUser} style = {letterStyle}>*회원탈퇴</InputLabel>
        </Grid>
        <Grid item xs={6}>
            <InputLabel onClick={sendEmail}>*관리자신청</InputLabel>
        </Grid>
      </Grid>
    </MainCard>
  );
};
export default Mypage;
