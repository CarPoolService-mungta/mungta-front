import React, { useState, useRef } from 'react';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import {Link,Button,Container,Avatar,Typography} from '@material-ui/core';
import {useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
//import PropTypes from "prop-types";

import pic from 'assets/images/users/avatar-1.png'
// Avatar.propTypes = {
//     src:PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object
//     ])
//   };
const avartarStyle = {
height: "20vh",
width : "10vw",
marginLeft: 100,
marginBottom: 20,
}

const Mypage = () => {
  let userInfo   = useSelector(state =>  state.userInfo );
  console.log("reduxInfo:",userInfo );

  const navigate = useNavigate();

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
          <Avatar src={pic} style = {avartarStyle} ></Avatar>
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
