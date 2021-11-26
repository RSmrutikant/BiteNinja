import React, { Component, Fragment } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import './Header.css';
import history from '../../Utils/HistoryUtil';
import {
    CHAT,
    BELL,
    LOGOUT,
    BADGE,
} from '../../Helpers/IconsHelper';
import { clearStorage } from '../../Utils/StorageUtil';
import { SearchOutlined, ExportOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false
        }
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = () => {
        clearStorage();
        history.push('/auth/login');
    };

    handleClick = () => {
        console.log('h')
    };

    render() {
        const { isSearching } = this.state;
        const { profile } = this.props;
        return (
            <Fragment>
                <div className="header-container">
                    <div className="header-bar">
                        <div className="notification-bar">
                            <img className="badge-img" src={BADGE} alt="badge" />
                            <h5 className="badge-text">Welcome {profile.firstName}!</h5>
                            <p className="badge-para">this is your new biteninja portal.</p>
                        </div>
                        <span className="search-bar">
                            <SearchOutlined
                                className="search-icon"
                                data-toggle="tooltip" title="Search"
                                onClick={!isSearching ? this.handleClick : null}
                            />
                            <input type="text" className="search-bar-input" style={{ "outline": "none" }} placeholder="Enter here !" />
                        </span>
                        <div className="icon-group">
                            <a className="icon-header" onClick={() => this.onLogout()}>
                                <ExportOutlined className="header-icons" />
                            </a>
                            {/* <a className="icon-header">
                                <BellOutlined className="header-icons" />
                            </a>
                            <a className="icon-header">
                                <MessageOutlined className="header-icons" />
                            </a> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}