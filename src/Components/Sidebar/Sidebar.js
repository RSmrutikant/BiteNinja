import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, NavLink } from 'react-router-dom';
import { getItem } from '../../Utils/StorageUtil';
import { STORAGE_KEYS } from '../../Constants/StorageKeysConstant';
import './Sidebar.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';
import {
  LOGO_SYMBOL_DARK,
  PROFILE_PIC_BACKGROUND,
  DUMMY_MALE_PROFILE_PIC,
} from '../../Helpers/ImageHelper';
import {
  MEETING_LOGO,
  TRAINING_LOGO,
  ALERT_LOGO,
  CONTACT_LOGO,
} from '../../Helpers/IconsHelper';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  BellOutlined,
} from '@ant-design/icons';
import restaurantSvg from '../../Assets/Icons/sidebar-nav/restaurant.svg';
import departmentSvg from '../../Assets/Icons/sidebar-nav/department.svg';
import meetingSvg from '../../Assets/Icons/sidebar-nav/meeting.svg';
import trainingSvg from '../../Assets/Icons/sidebar-nav/training.svg';
const YEAR = moment().format('YYYY');
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentDidMount = () => { };

  toggleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({
      isCollapsed: !isCollapsed,
    });
  };

  render() {
    const { isCollapsed } = this.state;
    const { profile } = this.props;
    let arrow;
    if (isCollapsed)
      arrow = (
        <ArrowRightOutlined
          className={'arrow'}
          onClick={() => this.toggleCollapse()}
        />
      );
    else
      arrow = (
        <ArrowLeftOutlined
          className={'arrow arrow-left'}
          onClick={() => this.toggleCollapse()}
        />
      );
    return (
      <Fragment>
        <Container className="m-0 p-0 sidebar-container">
          <ProSidebar width={315} collapsed={isCollapsed}>
            <div className="arrow-wrapper">{arrow}</div>
            <div className="profile-wrapper">
              <Image
                className={isCollapsed ? 'colpse' : ''}
                src={DUMMY_MALE_PROFILE_PIC}
                alt="user-pic"
                roundedCircle
              />
              <h4 className={isCollapsed ? 'colpse' : ''}>
                <Link to="/">
                  {' '}
                  {profile?.firstName + ' ' + profile?.lastName}
                </Link>
              </h4>
            </div>
            {/* <hr className="profileHr" /> */}
            <Menu iconShape="round">
              {/* <MenuItem icon={<HomeOutlined className="icon" />}>
                <Link to="/home">Dashboard </Link>
              </MenuItem> */}
              <SubMenu
                icon={<CalendarOutlined className="icon" />}
                title="Shifts"
              >
                {profile?.role === 'admin' ? (
                  <MenuItem>
                    <Link to="/calendar">Shift Entries</Link>
                  </MenuItem>
                ) : (
                  <> </>
                )}
                <MenuItem>
                  <Link
                    to={
                      profile?.role === 'admin' ? 'adminshifts' : '/usershifts'
                    }
                  >
                    {profile?.role !== 'admin' ? 'Up for grabs' : 'Shift Pool'}
                  </Link>
                </MenuItem>
                {profile?.role !== 'admin' ?
                  <MenuItem>
                    <Link to="/myshifts">My Shifts</Link>
                  </MenuItem> : <></>}
              </SubMenu>
              {profile?.role === 'admin' ? (
                <SubMenu
                  icon={<CalendarOutlined className="icon" />}
                  title="Manage"
                >
                  <MenuItem
                    active={true}
                    icon={<UserOutlined className="icon" />}
                  >
                    <Link to="/users">Users</Link>{' '}
                  </MenuItem>
                  <MenuItem icon={<img src={restaurantSvg} className="icon" />}>
                    <Link to="/restaurants">Restaurants</Link>
                  </MenuItem>
                  {/* <MenuItem icon={<EnvironmentOutlined className="icon" />}>
                  <Link to="/locations">Locations</Link>
                </MenuItem> */}
                  <MenuItem icon={<img src={departmentSvg} className="icon" />}>
                    <Link to="/departments">Departments</Link>{' '}
                  </MenuItem>
                </SubMenu>
              ) : (
                <></>
              )}
              {/* <MenuItem icon={<img src={MEETING_LOGO} className="icon" />}>
                <Link to="/meetings">Meetings</Link>{' '}
              </MenuItem> */}
              <MenuItem icon={<img src={TRAINING_LOGO} className="icon" />}>
                <a
                  href="https://bite-ninja.trainualapp.com/users/sign_in"
                  target="_blank"
                  rel="noreferrer"
                >Trainings</a>
              </MenuItem>

              <MenuItem icon={<img src={CONTACT_LOGO} className="icon" />}>
                Contact
              </MenuItem>
              <MenuItem icon={<img src={ALERT_LOGO} className="icon" />}>
                Status
              </MenuItem>
            </Menu>
            <div className="footer-wrapper">
              <img
                className={isCollapsed ? 'colpse' : ''}
                src={LOGO_SYMBOL_DARK}
                alt="logo"
              />
              <h4 className={isCollapsed ? 'colpse' : ''}>Bite Ninja</h4>
              <p className={isCollapsed ? 'colpse' : ''}>
                Best Experience, Every Time
              </p>
              <h5 className={isCollapsed ? 'colpse' : ''}>
                &#169; BiteNinja {YEAR}
              </h5>
            </div>
          </ProSidebar>
        </Container>
      </Fragment>
    );
  }
}
