import {Navigate, useLocation} from 'react-router-dom';
import { localStorageHandler } from 'utils';
import { ACCESS_TOKEN } from 'utils/constants';
import {useEffect, useState} from 'react';
import {initialize} from 'utils/authProvider';


export default function AuthProtect({children}) {
  const {pathname} = useLocation();
  const isAuthPage = pathname.includes('auth');
  const [accessToken,setAccessToken] = useState(null);
  if(!isAuthPage){
    setAccessToken(localStorageHandler.getItem(ACCESS_TOKEN));
  }

  //Todo 리프레시 로직 추가
  useEffect(()=>{
    initialize();
  },[])

  // 비로그인 상태일 때
  if (!isAuthPage && (!accessToken || accessToken=="")) {
    return <Navigate to={'/auth/login'} replace />;
  }
  return children;
}
