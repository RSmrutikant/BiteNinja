import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  LOGO_SYMBOL_DARK,
  PROFILE_PIC_BACKGROUND,
  DUMMY_MALE_PROFILE_PIC,
} from '../../Helpers/ImageHelper';

const SideBar = () => {
  const { profile } = useSelector((state) => state.authData);

  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };

  return (
    <>
      <div className="sidebar ">
        <div
          className="profile-section"
          style={{ backgroundImage: `url(${PROFILE_PIC_BACKGROUND})` }}
        >
          <img src={DUMMY_MALE_PROFILE_PIC} alt="user-pic" />
          <h4>
            {profile?.firstName} {profile?.lastName}
          </h4>
          <p style={{ minHeight: 20 }}>
            <Link to="/">View Profile</Link>
          </p>
          {/* <h1>{location.pathname}</h1> */}
          <div className="menu-section ml-4">
            <ul>
              <li className={location.pathname === '/home' ? 'activeTab' : ''}>
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                <Link to="/home">Home</Link>
              </li>
              {profile?.role === 'admin' && (
                <>
                  <li
                    className={
                      location.pathname === '/users' ? 'activeTab' : ''
                    }
                  >
                    <svg
                      style={{ marginInline: '0.5rem' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    <Link to="/users">Users</Link>
                  </li>
                  <li
                    className={
                      location.pathname === '/restaurants' ? 'activeTab' : ''
                    }
                  >
                    <svg
                      style={{ marginInline: '0.5rem' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bank"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z" />
                    </svg>
                    <Link to="/restaurants">Restaurants</Link>
                  </li>
                  <li
                    className={
                      location.pathname === '/locations' ? 'activeTab' : ''
                    }
                  >
                    <svg
                      style={{ marginInline: '0.5rem' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <Link to="/locations">Locations</Link>
                  </li>
                  <li
                    className={
                      location.pathname === '/departments' ? 'activeTab' : ''
                    }
                  >
                    <svg
                      style={{ marginInline: '0.5rem' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                    <Link to="/departments">Departments</Link>
                  </li>
                </>
              )}
              <li
                className={location.pathname === '/meetings' ? 'activeTab' : ''}
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                <Link to="/meetings">Meetings</Link>
              </li>
              <li
                className={
                  location.pathname === '/trainings' ? 'activeTab' : ''
                }
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 13.5a.5.5 0 0 0 .5.5h3.797a.5.5 0 0 0 .439-.26L11 3h3.5a.5.5 0 0 0 0-1h-3.797a.5.5 0 0 0-.439.26L5 13H1.5a.5.5 0 0 0-.5.5zm10 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5z" />
                </svg>
                <a
                  href="https://bite-ninja.trainualapp.com/users/sign_in"
                  target="_blank"
                  rel="noreferrer"
                >
                  Trainings
                </a>
              </li>
              {/* <li><svg style={{  marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shift" viewBox="0 0 16 16">
                <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5 8 2.731 1.654 9.5H4.5a1 1 0 0 1 1 1v3h5v-3a1 1 0 0 1 1-1h2.846z" />
              </svg><a href="https://app.7shifts.com/users/login?redirect=/employers/shiftpool/" target="_blank" rel="noreferrer">Shifts</a></li> */}
              <li
                className={
                  location.pathname === '/usershifts' ? 'activeTab' : ''
                }
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-shift"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5 8 2.731 1.654 9.5H4.5a1 1 0 0 1 1 1v3h5v-3a1 1 0 0 1 1-1h2.846z" />
                </svg>
                <Link
                  to={profile?.role === 'admin' ? 'adminshifts' : '/usershifts'}
                >
                  Shifts Pool
                </Link>
              </li>
              <li
                className={location.pathname === '/myshifts' ? 'activeTab' : ''}
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-shift"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5 8 2.731 1.654 9.5H4.5a1 1 0 0 1 1 1v3h5v-3a1 1 0 0 1 1-1h2.846z" />
                </svg>
                <Link to={profile?.role === 'admin' ? 'myshifts' : '/myshifts'}>
                  My Shifts
                </Link>
              </li>
              <li
                className={location.pathname === '/calendar' ? 'activeTab' : ''}
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-bar-chart-line-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
                </svg>
                <Link to="/calendar">Shift Entries</Link>
              </li>
              <li
                className={
                  location.pathname === '/trainings' ? 'activeTab' : ''
                }
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-headset"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
                </svg>
                <Link to="/">Contact</Link>
              </li>
              <li
                className={
                  location.pathname === '/trainings' ? 'activeTab' : ''
                }
              >
                <svg
                  style={{ marginInline: '0.5rem' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-bar-chart-line-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
                </svg>
                <Link to="/">Status</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <img src={LOGO_SYMBOL_DARK} alt="logo" />
            <h2>Bite Ninja</h2>
            <p>Best Experience, Every Time</p>
            <h5>&#169; BiteNinja 2021</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
