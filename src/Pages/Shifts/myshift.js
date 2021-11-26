import React from 'react';
import './adminshift.css';
import './shiftfont.css';

import { Row, Col, Container, Dropdown, Table } from 'react-bootstrap';
import {
  bidShiftAction,
  getMyShift,
  startShiftAction,
  endShiftAction,
  feedbacAction,
} from './ShiftActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker, Space, Timeline } from 'antd';
import { Pagination, Empty, Modal } from 'antd';
import Custombutton from '../../Components/CustomerButton';
import {
  CloseOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  StarOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import { Table as AntdTable } from 'antd';
import { getAllRestaurants } from '../../Services/RestaurantService';
import { getAllLocations } from '../../Services/LocationsService';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Input, Typography, Rate } from 'antd';
import useDidMountEffect from '../../Helpers/UseDidMountEffect';
import { LEFT_ARROW, RIGHT_ARROW } from '../../Helpers/IconsHelper';
import { hideLoader, showLoader } from '../../Utils/LoaderUtil';
import { ZoomMtg } from '@zoomus/websdk';
import { REACT_APP_ZOOM_JWT_API_KEY } from '../../Configs/EnvConfig';
import { generateSignature } from '../../Services/MeetingService';

const { Text, Link } = Typography;
// import Rate from 'react-rating';

const { TextArea } = Input;

const size = 20;

function rowStyleFormat(rowIdx) {
  return { backgroundColor: rowIdx % 2 === 0 ? '#fff' : '#f5f5f7' };
}

const UserShifts = () => {
  const dispatch = useDispatch();

  const [data, setdata] = useState([]);
  const [date, setdate] = useState(moment());
  const [page, setpage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [filter, setFilters] = useState({
    restaurantId: '',
    locationId: '',
  });

  const [feedback, setFeedback] = useState({ rating: 5, comments: '' });
  const { profile } = useSelector((state) => state.authData);

  useDidMountEffect(() => {
    // setpage(1);
    getShifts(moment(date).format('YYYY-MM-DD'), 1);
  }, [date]);
  useDidMountEffect(() => {
    getShifts(moment(date).format('YYYY-MM-DD'), page);
  }, [page]);

  useEffect(() => {
    getShifts(moment().format('YYYY-MM-DD'), 1);
  }, []);

  const getShifts = (date, page) => {
    dispatch(
      getMyShift(date, date, size, page, (data) => {
        setdata(data);
      }),
    );
  };

  const getStaus = (shift) => {
    var ms = moment(shift?.from).diff(moment());

    if (shift?.status === 'PENDING') {
      var d = moment.duration(ms, 'milliseconds').asMinutes();

      if (
        (parseInt(d) < 3000 && parseInt(d) > 0) ||
        moment().isBetween(moment(shift?.from), moment(shift?.to))
      ) {
        return 'START';
      } else if (d <= 0) {
        return 'CANCELLED';
      } else {
        return 'UPCOMMING';
      }
    } else if (
      shift?.status === 'IN_PROGRESS' &&
      moment(shift?.to).isBefore(moment())
    ) {
      // also check for to time then change the status to end time
      return 'END SHIFT';
    } else if (shift?.status === 'IN_PROGRESS') {
      return 'IN PROGRESS';
    } else {
      return shift?.status;
    }
  };
  const startShift = (shift) => {
    dispatch(
      startShiftAction(shift?.shiftEntryId, (data) => {
        getShifts(moment(date).format('YYYY-MM-DD'), page);
      }),
    );
  };
  const endShift = (shift) => {
    dispatch(feedbacAction(shift?.shiftEntryId, feedback, (data) => {}));
    dispatch(
      endShiftAction(shift?.shiftEntryId, (data) => {
        getShifts(moment(date).format('YYYY-MM-DD'), page);
      }),
    );
  };

  const loadRestaurants = async (search, loadedOptions, { page }) => {
    let qParams = {
      page: page,
      search: search,
    };

    let data = await getAllRestaurants(qParams.page, qParams.search).then(
      (res) => {
        return {
          options:
            res.data.data.results &&
            res.data.data.results.map((item) => {
              return {
                key: item.id,
                value: item.id,
                label: item.restaurantName,
              };
            }),
          totalPage:
            parseInt(res.data.data.pageMeta.totalCount || 0) /
            parseInt(res.data.data.pageMeta.pageCount || 0),
        };
      },
    );

    return {
      options: data.options,
      hasMore: data.totalPage > page ? true : false,
      additional: {
        page: page + 1,
      },
    };
  };
  const loadLocations = async (search, loadedOptions, { page }) => {
    let data = await getAllLocations(filter?.restaurantId, page, search).then(
      (res) => {
        return {
          options:
            res.data.data.results &&
            res.data.data.results.map((item) => {
              return {
                key: item.id,
                value: item.id,
                label: item.locationName,
              };
            }),
          totalPage:
            parseInt(res.data.data.pageMeta.totalCount || 0) /
            parseInt(res.data.data.pageMeta.pageCount || 0),
        };
      },
    );

    return {
      options: data.options,
      hasMore: data.totalPage > page ? true : false,
      additional: {
        page: page + 1,
      },
    };
  };

  const generateSignatureForJoiningCall = async (meetingNumber) => {
    try {
      console.log('Meeting NUmber ', meetingNumber);
      const body = {
        meetingNumber: meetingNumber, //meeting.meetingNumber,
        role: '0',
      };
      const res = await generateSignature(body);
      const { data } = res;
      const { success } = data;
      if (success) {
        return data?.data?.signature;
      }
    } catch (error) {
      console.log('generateSignatureForJoiningCall error :: ', error);
    }
  };

  const startMeeting = async (department) => {
    showLoader();

    let getSignature = await generateSignatureForJoiningCall(
      department?.zoomId,
    );

    var meetingConfig = {
      meeting_number: department?.zoomId,
      meeting_pwd: department?.zoomPassword,
      pwd: department?.zoomPassword,
      role: 0,
      email: profile?.email || 'test@gmail.com',
      signature: getSignature,
      apiKey: REACT_APP_ZOOM_JWT_API_KEY,
      name: profile?.firstName || 'Guest',
    };
    const joinUrl = `/meetings/${department?.zoomId}/${department?.zoomPassword}/${getSignature}`;
    console.log('joinUrl', joinUrl);
    window.open(joinUrl, '_blank');
    hideLoader();
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => (
        <Space size="middle">{record?.userDetail?.firstName || '--'}</Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <Space size="middle">{record?.userDetail?.email || '--'}</Space>
      ),
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">{record?.userDetail?.phone || '--'}</Space>
        </Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Space size="middle">
          <Custombutton
            onClick={() => {}}
            title="Assign"
            type="primary"
          ></Custombutton>
          <Custombutton title="Deny" type="alternate"></Custombutton>
        </Space>
      ),
    },
  ];

  return (
    <Container fluid className="px-4 py-4">
      <Row>
        <Col md={4}>
          <h2 className="Meeting-heading" style={{ color: '#e06030' }}>
            My Shifts
          </h2>
        </Col>
        <Col
          md={8}
          className="d-flex justify-content-end px-4 align-self-end mb-2"
        >
          <small className="pagination-indicator" style={{ fontWeight: '600' }}>
            {(page - 1) * size <= 0 ? 1 : (page - 1) * size} -{' '}
            {data?.results?.length * page} of {data?.pageMeta?.totalCount || 0}
          </small>
        </Col>
      </Row>

      <div className="filter-container my-1">
        <div style={{ fontSize: '1.5rem' }}>
          <img
            src={LEFT_ARROW}
            className="mr-2"
            style={{ height: 20, width: 20 }}
            data-toggle="tooltip"
            title="Next Week!"
            alt="<"
            onClick={() => {
              setdate(moment(date).subtract(1, 'd'));
            }}
          />

          <small className="pagination-indicator">
            {moment(date).format('YYYY/MM/DD')}
          </small>
          <img
            src={RIGHT_ARROW}
            className="ml-2"
            style={{ height: 20, width: 20 }}
            data-toggle="tooltip"
            title="Next Week!"
            alt="<"
            onClick={() => {
              setdate(moment(date).add(1, 'd'));
            }}
          />
        </div>
        <div className="d-flex">
          <div
            style={{
              fontWeight: '800',
              marginTop: '6px',
              paddingInline: '10px',
            }}
          >
            <small style={{ fontSize: 16, color: '#4c4c4c' }}>Filter By:</small>
          </div>

          <div className="department">
            <Dropdown>
              <div
                className="shadow"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '25px',
                  width: '150px',
                }}
              >
                <DatePicker
                  bordered={false}
                  onChange={(date, dateString) => {
                    setdate(date);
                  }}
                  value={date}
                  allowClear={false}
                  defaultValue={date}
                  className="date-picker"

                  // suffixIcon={null}
                />
              </div>
            </Dropdown>
          </div>
          {/* <div className="drp-select-group">
            <div className="drp-select-group">
              <AsyncPaginate
                loadOptions={loadRestaurants}
                additional={{
                  page: 1,
                }}
                placeholder="Restaurants"
                isClearable={true}
                isSearchable={true}
                classNamePrefix="select"
                onChange={(e) => {
                  console.log('change', e);
                  setFilters((prevState) => ({
                    ...prevState,
                    restaurantId: e?.key,
                  }));
                }}
              />
            </div>
          </div>
          <div className="drp-select-group">
            <AsyncPaginate
              loadOptions={loadLocations}
              additional={{
                page: 1,
              }}
              isDisabled={!filter?.restaurantId}
              placeholder="Locations"
              //   cacheUniqs={[contentType, clearCache]}
              isClearable={true}
              isSearchable={true}
              classNamePrefix="select"
              onChange={(e) => {
                setFilters((prevState) => ({
                  ...prevState,
                  locationId: e?.key,
                }));
              }}
            />
          </div>*/}
        </div>
      </div>
      <div className="shift-table-container mt-4 ">
        <Table
          className="shiftpool-table py-1 my-4 text-center"
          column={4}
          striped
        >
          <thead className="shift-table-header">
            <tr className="" style={{ backgroundColor: 'transparent' }}>
              <th>Shift</th>
              <th>Restaurant</th>
              <th>Location</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center shift-table-body">
            {data?.results?.map((shift, index) => (
              <tr
                key={shift?.id}
                className={index % 2 === 0 ? 'table-e-tr' : 'table-o-tr'}
              >
                <td className="py-2">
                  {moment(shift?.from).format('hh:mm a')}-
                  {moment(shift?.to).format('hh:mm a')}
                </td>

                <td className="py-2">
                  {shift?.department?.location?.restaurant?.restaurantName}
                </td>
                <td className="py-2">
                  {shift?.department?.location?.locationName}
                </td>
                <td className="py-2">{shift?.department?.departmentName}</td>
                <td className="py-2 d-flex justify-content-center">
                  <Custombutton
                    title={getStaus(shift)}
                    type={
                      shift.status === 'COMPLETED'
                        ? 'sucess'
                        : getStaus(shift) === 'START' ||
                          getStaus(shift) === 'END SHIFT'
                        ? 'primary'
                        : shift.status === 'IN_PROGRESS'
                        ? 'upcomming'
                        : 'alternate'
                    }
                    shape="round"
                    onClick={() => {
                      if (getStaus(shift) === 'START') {
                        startShift(shift);
                      } else if (
                        shift?.status === 'IN_PROGRESS' &&
                        getStaus(shift) === 'END SHIFT'
                      ) {
                        setSelectedShift(index);
                        setVisible(true);
                      } else {
                      }
                    }}
                  />
                  {shift.status === 'IN_PROGRESS' && (
                    <>
                      <Custombutton
                        onClick={() => startMeeting(shift?.department)}
                        type="primary"
                        title="Join Meeting"
                        disabled={
                          !shift?.department?.zoomId ||
                          !shift?.department?.zoomPassword
                        }
                      />
                      <Custombutton type="alternate" title="Menu" />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          closable={false}
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={350}
          footer={null}
          className="review-modal"
        >
          <CloseOutlined
            onClick={() => setVisible(false)}
            className="close-modal"
          />
          <h3 className="shift-review">
            How was your experience at{' '}
            {data?.results?.length > 0
              ? `Shift from ${data?.results[selectedShift]?.department?.location?.locationName}
                  `
              : '-'}
          </h3>
          <div className="mb-3 timings-from-to">
            <h3>
              {' '}
              {data?.results?.length > 0 &&
                moment(data?.results[selectedShift]?.from).format(
                  'DD-MM-YY',
                )}{' '}
            </h3>
            <h3>
              {data?.results?.length > 0 &&
                moment(data?.results[selectedShift]?.from).format('hh:mm')}{' '}
              -{' '}
              {data?.results?.length > 0 &&
                moment(data?.results[selectedShift]?.to).format('hh:mm')}
            </h3>
          </div>

          <Rate
            // emptySymbol={<StarOutlined />}
            // fullSymbol={<StarOutlined style={{ fill: 'red' }} />}
            // className="ma-8"
            style={{ color: '#00c' }}
            onChange={(e) => {
              setFeedback((prevState) => {
                return { ...prevState, rating: e };
              });
            }}
          />
          <TextArea
            className="mt-5"
            value={feedback.comments}
            onChange={(ev) =>
              setFeedback((prevState) => {
                return { ...prevState, comments: ev.target.value };
              })
            }
            rows={8}
          />
          <Text className="shown-warning" type="secondary">
            <LockOutlined
              style={{ marginLeft: 0, marginRight: '0.5rem' }}
              className="lock-icon"
            />
            Only Visible to Managers
          </Text>
          <Custombutton
            title="SUBMIT"
            type="primary"
            shape="round"
            onClick={() => {
              //   setSelectedShift(index);
              endShift(data?.results[selectedShift]);
              setVisible(false);
            }}
          />
        </Modal>
      </div>
      {data?.results?.length === 0 ? (
        <Empty
          className="empty-container"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Pagination
          onChange={(page) => setpage(page)}
          total={data?.pageMeta?.totalCount || 0}
          pageSize={size}
          showTitle={true}
          responsive
          //   showTotal={true}
          //   hideOnSinglePage={true}
        />
      )}
    </Container>
  );
};

export default UserShifts;
