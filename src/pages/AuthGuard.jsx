import {Navigate, useLocation} from 'react-router-dom';
import { localStorageHandler } from 'utils';
import { ACCESS_TOKEN } from 'utils/constants';


export default function AuthProtect({children}) {
  const {pathname} = useLocation();
  const accessToken = localStorageHandler.getItem(ACCESS_TOKEN);
  const isAuthPage = pathname.includes('auth');

  // 비로그인 상태일 때
  if (!isAuthPage && !accessToken) {
    return <Navigate to={'/auth/login'} replace />;
  }
  return children;
}
