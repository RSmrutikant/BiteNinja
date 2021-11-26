import { useEffect, useState } from 'react';
import { Row, Col, Table, Container, Tab, Tabs } from 'react-bootstrap';
import { ZoomMtg } from '@zoomus/websdk';
import './Meetings.css';
import { Alert, message } from 'antd';
import { hideLoader, showLoader } from '../../Utils/LoaderUtil';
import { REACT_APP_ZOOM_JWT_API_KEY } from '../../Configs/EnvConfig';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.6/lib', '/av');
// ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.9.2/lib', '/av')
// ZoomMtg.preLoadWasm()
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.prepareJssdk();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
const role = '0'; //0 for meeting & 1 for webinar
const leaveUrl = window.location.origin;

const Meetings = () => {
  let { m_num, m_pwd, m_singature } = useParams();
  const { profile } = useSelector((state) => state.authData);

  const startMeeting = () => {
    showLoader();
    document.getElementById('zmmtg-root').style.display = 'block';
    document.getElementById('zmmtg-root').style['z-index'] = '200';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      screenShare: true,
      isSupportChat: true,
      success: (success) => {
        showLoader();
        ZoomMtg.join({
          signature: m_singature,
          meetingNumber: m_num,
          userName: profile?.firstName || 'Guest',
          apiKey: REACT_APP_ZOOM_JWT_API_KEY,
          userEmail: profile?.email || 'test@gmail.com',
          passWord: m_pwd,
          tk: '',
          success: (success) => {
            hideLoader();
            console.log('join success', success);
          },
          error: (error) => {
            hideLoader();
            message.info(error?.errorMessage);

            console.log('unable to join', error);
          },
        });
      },
      error: (error) => {
        hideLoader();
        console.log(error);
      },
    });
  };

  useEffect(() => {
    console.log('calling the meetings js and starting meeting');
    startMeeting();
  }, []);

  return (
    <>
      <Container fluid className="px-4 ">
        <Row className="my-4">
          <Col md={9}>
            <h2 className="Meeting-heading" style={{ color: '#e06030' }}>
              Meetings
            </h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Meetings;
