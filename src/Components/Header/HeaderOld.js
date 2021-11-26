import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import './Header.css';
import history from '../../Utils/HistoryUtil';
import {
    CHAT,
    BELL,
    LOGOUT,
    BADGE,
} from '../../Helpers/IconsHelper';
import { logoutActionType } from '../../Pages/Auth/AuthActionTypes';
import { clearStorage } from '../../Utils/StorageUtil';

const Header = () => {

    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.authData);

    const logout = () => {
        dispatch(logoutActionType());
        clearStorage();
        history.push('/auth/login');
    };

    return (
        <>
            <Row className="mt-3">
                <Col md={5} >
                    <div className="navbar content-box">
                        <div className="notification-panel d-flex justify-content-start">
                            <img src={BADGE} alt="" />
                            <div className="notification px-3 pt-1">
                                <h3>Congratulations {userDetails?.firstName}!</h3>
                                <p>for reaching 100% of your goal.</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={7}>
                    <Row className="mr-3 mt-3">
                        <Col md={9}>
                            <div className="search-bar">
                                <div className="search-bar-input">
                                    <input type="text" />
                                </div>
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className="nav-icon chat-menu">
                                <div className="icon pointer">
                                    <img src={CHAT} alt="chat-icon" />
                                </div>
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className="nav-icon notification-menu">
                                <div className="icon pointer">
                                    <img src={BELL} alt="bell-icon" />
                                </div>
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className="nav-icon logout-menu">
                                <div className="icon pointer">
                                    <img src={LOGOUT} alt="logout-icon" onClick={logout} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Header;