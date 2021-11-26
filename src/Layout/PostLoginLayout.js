import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PostLoginLayout.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import Home from '../Pages/Home/Home';
import Meetings from '../Pages/Meetings/Meetings';
import Training from '../Pages/Training/Training';
import UserShifts from '../Pages/Shifts/Shifts';
import AdminShifts from '../Pages/Shifts/AdminShift';
import Users from '../Pages/Users/Users';
import Restaurants from '../Pages/Restaurants/Restaurants';
import Locations from '../Pages/Locations/Locations';
import Departments from '../Pages/Departments/Departments';
import EventCalendar from '../Pages/Calendar/eventCalendar';
import MyShifts from '../Pages/Shifts/myshift';
import { userProfile } from '../Pages/Auth/AuthActions';
const PostLoginLayout = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userProfile((data) => {
        setProfile(data);
      }),
    );
  }, []);

  return (
    <Fragment>
      <div className="sidebar" md={2}>
        <Sidebar profile={profile} />
      </div>
      <div className="headerbar" md={10}>
        <Header profile={profile} />
      </div>
      <div className="flex p-0 global-container">
        <div className="px-4 w-100">
          <div>
            <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>
              <Route path="/meetings/:m_num/:m_pwd/:m_singature">
                <Meetings />
              </Route>
              <Route path="/training" exact>
                <Training />
              </Route>
              <Route path="/usershifts" exact>
                <UserShifts />
              </Route>
              <Route path="/adminshifts" exact>
                <AdminShifts />
              </Route>
              <Route path="/users" exact>
                <Users />
              </Route>
              <Route path="/restaurants" exact>
                <Restaurants />
              </Route>
              <Route path="/locations" exact>
                <Locations />
              </Route>
              <Route path="/departments" exact>
                <Departments />
              </Route>
              <Route path="/myshifts" exact>
                <MyShifts />
              </Route>
              <Route path="/calendar" exact>
                <EventCalendar />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostLoginLayout;
