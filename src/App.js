import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Auth from './Pages/Auth/Auth';
import Terms from './Pages/Terms/Terms';
import Loader from './Components/UI/Loader/Loader';
import history from './Utils/HistoryUtil';
import PostLoginLayout from './Layout/PostLoginLayout';
import MyShifts from './Pages/Shifts/AdminShift';
import { STORAGE_KEYS } from './Constants/StorageKeysConstant';
import { getItem, setItem } from './Utils/StorageUtil';
import { loginSuccessActionType } from './Pages/Auth/AuthActionTypes';
import { loginAction, userProfile } from './Pages/Auth/AuthActions';
import Store from './Store/Store';
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = getItem(STORAGE_KEYS.ACCESS_TOKEN);
  // const { isLoggedIn } = useSelector((state) => state.authData);

  useEffect(() => {
    const isLoggedIn = getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const loginDetails = getItem(STORAGE_KEYS.LOGIN_DETAILS);
    if (isLoggedIn && loginDetails) {
      dispatch(loginSuccessActionType({ userDetails: loginDetails }));
      // dispatch(
      //   userProfile((data) => {
      //     setItem(STORAGE_KEYS.USER_DETAILS, data);
      //     console.log('userProfile userProfile', data);
      //   }),
      // );
      if (location && location.pathname) {
        if (location.pathname !== '/' && !location.pathname.includes('/auth')) {
          history.push(location.pathname);
        } else {
          history.push('/myshifts');
        }
      } else {
        history.push('/myshifts');
      }
    } else {
      console.log('Location path name ', location.pathname);
      if (location.pathname === '/auth/signup') {
        history.push('/auth/signup');
      } else {
        history.push('/auth/login');
      }
      // if (location && location.pathname) {
      //   if (location.pathname !== '/') {
      //     history.push(location.pathname);
      //   } else {
      //   }
      // } else {
      //   history.push('/auth/login');
      // }
    }
  }, []);

  return (
    <>
      <Switch>
        <Route path="/terms" exact>
          <Terms />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>

      {isLoggedIn && <PostLoginLayout />}

      <Switch>
        <Redirect from="/" to="/auth"></Redirect>
      </Switch>

      {/* Insert loader component inside #overlay div using portal */}
      {ReactDOM.createPortal(<Loader />, document.getElementById('overlay'))}
    </>
  );
};

export default App;
