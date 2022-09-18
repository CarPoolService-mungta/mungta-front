import React, { useState, useRef,useEffect } from 'react';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import {Link,Button,Container,Avatar,Typography} from '@material-ui/core';
import {useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getPhotoByUserId} from 'api/user'
import CustomError from 'utils/CustomError';
import { SignalCellularConnectedNoInternet2Bar } from '../../../node_modules/@material-ui/icons/index';

const avartarStyle = {
height: "20vh",
width : "10vw",
marginLeft: 100,
marginBottom: 20,
}

const Mypage = () => {

  let userInfo   = useSelector(state =>  state.userInfo );

  const navigate = useNavigate();
  const [dataUrlmage   , setdataUrlmage]    = useState(null);
  const imgRef   = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async ()=>{
      await viewPhoto()
  },[]);

  let dataUrlmagetmp ='';

  const viewPhoto = async ()=>{

      await setIsLoading(true);
      const response = await getPhotoByUserId(userInfo.userId)
      .then((response) => {
        if(response instanceof CustomError){
          return;
        }else{
          const str1='data:image/';
          const str2=response.fileExtension;;
          const str3=';base64,';
          const str4=response.userPhoto;
          dataUrlmagetmp =str1+str2+str3+str4;
        }
      });
      await setdataUrlmage(dataUrlmage => dataUrlmagetmp);
      await setIsLoading(false);
  };
  const handleImage = async(e)=>{}


  const goUpdate = () => {
    alert("회원정보수정");
    //navigate('/party-management')
  };
  const goAdminChange = () => {
    alert("관리자회원변경신청");
    //navigate('/party-management')
  };
  const goReview = () => {
    alert("리뷰화면이동!");
    //navigate('/party-management')
  };
  const goAccuse = () => {
    alert("신고화면이동");
    //navigate('/party-management')
  };
  const goCarpool = () => {
    navigate('/party-management')
  };

  return (
    <MainCard darkTitle={true}  title="Mypage" >
      <Box sx={{ alignSelf: 'center',maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, }}>
        <Container align="left" sx={{ margin: 1 }} >
          <Avatar src={dataUrlmage} style = {avartarStyle}></Avatar>
          <input  type='file' style={{display:'none'}} accept='image/jpg,impge/png,image/jpeg' name='profileImg' onChange={handleImage} ref={imgRef}/>
          <Typography  variant="h3">
            {userInfo.userName}님 환영합니다.
          </Typography>
        </Container>
        <Container>
        {/* <Link to="/mypage/modify"> */}
          <Button type="submit"  sx={{ width: 148, padding: 1, margin: 1 }} variant="contained" color="primary" onClick={goUpdate}>회원정보수정</Button>
        {/* </Link> */}
        <span>  </span>

          <Button type="submit" sx={{ width: 148, padding: 1, margin: 1 }} variant="contained" color="primary" onClick={goAdminChange}>관리자회원변경</Button>
        </Container>
        <p></p>
        <div className="Mypage-detail">
        <ul><Link to="/review" variant="h3" onClick={goReview}>리뷰보기</Link></ul>
        <ul><Link to="/accuse" variant="h3" onClick={goAccuse}>신고내역보기</Link></ul>
        <ul><Link to="/party"  variant="h3" onClick={goCarpool}>카풀신청하기</Link></ul>
        </div>
      </Box>
    </MainCard>
  );
};
export default Mypage;
