import React, { useState, useRef } from 'react';
//import { signout} from 'utils/fetchHandler';
import { Link,Button,Container,Avatar,Typography} from '@material-ui/core';
import Box from '@mui/material/Box';

import pic from 'assets/images/users/avatar-1.png'
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

import MainCard from 'components/MainCard';

Avatar.propTypes = {
    src:PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  };

const imagestyle = {
height: "20vh",
width : "20vw",
}


const Mypage = () => {

  let userInfo    = useSelector(state =>  state.userInfo );
  console.log("reduxInfo:",userInfo );

////////////////////////////////// 파일업로드 테스트중
  const [image   , setImage]    = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef   = useRef();

  const handleImage = async(e)=>{
    const file = e.target.files[0];
    const err = checkImage(file);
    //프로필 사진 선택
    if(file){
      setImage(e.target.files[0]);
    }else{ //업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    return;
    }
    setImageUrl(file);
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        setImage(reader.result);
      }
    }
    reader.readAsDataURL(file);
  }

  const checkImage = (file) =>{
    let err="";
    if(!file) return err="File does not exist.";

    if(file.size>1024*1024){
      err = "The largest image size is 1mb.";
    }
    if(file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png'){
     err = "Image format is incorrect.";
    }
    return err;
  }

  // 이미지 업로드
  // const handleSubmit= async(e) =>{
  const handleSubmit= event =>{
    event.preventDefault();
    var imageURL = '';
    if(imageUrl!==''){
      const bodyFormData = new FormData();
      bodyFormData.append('multipartFile', imageUrl);
      // const result = await axios.post('/message/image', bodyFormData,{
      //     headers : {Authorization : `Bearer ${auth.token}`}
      // })
      //imageURL = result.data;
    }
  }
 ////////////////////////////////// 파일업로드 테스트중 (end)
  return (
    <MainCard darkTitle={true}  title="Mypage" >
      <Box sx={{ alignSelf: 'center', ml: 2 }}>
        <Container align="center" >
          <Avatar alignItems='center' src={pic} style = {imagestyle} ></Avatar>
          <Typography variant="h3">
            {userInfo.userName} : {userInfo.userId}<br></br>{userInfo.userTeam}
          </Typography>
        </Container>
        <Container>
        <Link to="/mypage/modify">
          <Button type="submit" variant="contained" color="primary">회원정보수정</Button>
        </Link>
        <span>  </span>
        <Link to="/mypage/modify">
          <Button type="submit" variant="contained" color="primary">관리자회원변경</Button>
        </Link>
        </Container>
        <p></p>
        <div className="Mypage-detail">
        <ul><Link to="/review" variant="h3">리뷰보기</Link></ul>
        <ul><Link to="/accuse" variant="h3">신고내역보기</Link></ul>
        <ul><Link to="/party" variant="h3">파티신청하기</Link></ul>
        </div>
      </Box>
      {/* <Routes>
      <Route path="/signup" exact={true} element={SignUp} />
      <Route path="/login"  exact={true} element={Login}  />
      <Route path="/login"  exact={true} element={Login}  />
      </Routes> */}
{/* 파일업로드 추가 */}
      <div className="FileUpload">
      <Avatar src= {image} style = {imagestyle} onClick={()=>{imgRef.current.click()}}></Avatar>
      <input  type='file' style={{display:'none'}} accept='image/jpg,impge/png,image/jpeg' name='profileImg' onChange={handleImage} ref={imgRef}/>
      <Button type="submit" variant="contained" color="primary"  disabled={imageUrl? false : true } onClick={handleSubmit}>제출</Button>
      </div>
{/* 파일업로드 추가 */}
    </MainCard>
  );
};
export default Mypage;
