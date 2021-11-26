import React from 'react';
import './adminshift.css';
import { Row, Col, Container, Dropdown, Table, Modal } from 'react-bootstrap';
import {
  bidShiftAction,
  getAdminReservation,
  assignShift,
  denyShictAction,
} from './ShiftActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker, Space, Radio, Button } from 'antd';
import { Pagination, Empty } from 'antd';
import Custombutton from '../../Components/CustomerButton';
import {
  StepBackwardOutlined,
  CheckCircleOutlined,
  StepForwardOutlined,
  CheckCircleTwoTone,
  DownOutlined,
  MessageOutlined,
  DownloadOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import { Table as AntdTable } from 'antd';
import { getAllRestaurants } from '../../Services/RestaurantService';
import { getAllLocations } from '../../Services/LocationsService';
import { AsyncPaginate } from 'react-select-async-paginate';
import './shiftfont.css';
import GreenCheck from '../../Assets/Images/greenCheck.svg';
import Dollor from '../../Assets/Images/dollor.svg';

import { green } from 'jest-matcher-utils/node_modules/chalk';
import { LEFT_ARROW, RIGHT_ARROW } from '../../Helpers/IconsHelper';
import useDidMountEffect from '../../Helpers/UseDidMountEffect';

const size = 20;

function rowStyleFormat(rowIdx) {
  return { backgroundColor: rowIdx % 2 === 0 ? '#fff' : 'red' };
}

const UserShifts = () => {
  const dispatch = useDispatch();

  const [data, setdata] = useState([]);
  const [date, setdate] = useState(moment());
  const [page, setpage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [state, setstate] = useState({
    filter: 1,
    payment: false,
    isPaid: true,
  });
  const [filter, setFilters] = useState({
    restaurantId: '',
    locationId: '',
  });

  useEffect(() => {
    getShifts(moment().format('YYYY/MM/DD'), 1);
  }, []);
  useDidMountEffect(() => {
    getShifts(moment(date).format('YYYY/MM/DD'), 1);
  }, [date]);
  useDidMountEffect(() => {
    getShifts(moment(date).format('YYYY/MM/DD'), page);
  }, [page]);

  const getShifts = (date, page) => {
    dispatch(
      getAdminReservation(date, date, size, page, (data) => {
        setdata(data);
      }),
    );
  };

  const assignShiftTo = (user) => {
    let shift = data?.results[selectedShift];
    let raw = {
      from: shift?.from,
      to: shift?.to,
      restaurantId: shift?.department?.restaurantId,
      locationId: shift?.department?.locationId,
      departmentId: shift?.departmentId,
    };
    dispatch(
      assignShift(shift?.id, user?.userId, (data) => {
        getShifts(moment(date).format('YYYY/MM/DD'), page);
      }),
    );
  };

  const denyShiftToUser = (user) => {
    let shift = data?.results[selectedShift];

    dispatch(
      denyShictAction(shift?.id, user?.userId, (data) => {
        getShifts(moment(date).format('YYYY/MM/DD'), page);
      }),
    );
  };
  const getAssignedUser = (users) => {
    let user = users.filter((item) => item?.isApproved);
    return user.length > 0 ? user[0] : null;
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
        <Space size="middle">{record?.userDetail?.phone || '--'}</Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Space size="middle">
          {record?.isApproved ? (
            <Custombutton
              onClick={() => denyShiftToUser(record)}
              title="Deny"
              type="alternate"
            ></Custombutton>
          ) : (
            <Custombutton
              onClick={() => assignShiftTo(record)}
              title="Assign"
              type="primary"
            ></Custombutton>
          )}
        </Space>
      ),
    },
  ];

  const options = [
    { label: 'Requests', value: 1 },
    { label: 'Completed', value: 2 },
  ];

  return (
    <Container fluid className="px-4 py-4">
      <Row>
        <Col md={4}>
          <h2 className="Meeting-heading" style={{ color: '#e06030' }}>
            Shift Pool
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
      {/* 
      <Col md={12} className="d-flex justify-content-end px-4 mb-3">
        <Radio.Group
          className="mr-5"
          options={options}
          onChange={(e) => {
            setstate((prevState) => {
              return { ...prevState, filter: e.target.value, payment: true };
            });
          }}
          value={state?.filter}
          optionType="button"
          buttonStyle="solid"
        />

        <small className="pagination-indicator" style={{ fontWeight: '600' }}>
          {(page - 1) * size <= 0 ? 1 : (page - 1) * size} -{' '}
          {data?.results?.length * page} of {data?.pageMeta?.totalCount || 0}
        </small>
      </Col> */}
      <div className="filter-container my-1">
        <div style={{ fontSize: '1.5rem' }}>
          {/* <LEFT_ARROW
           
          /> */}
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
          {/* <RIGHT_ARROW
            onClick={() => {
              setdate(moment(date).add(1, 'd'));
            }}
          /> */}
          <img
            src={RIGHT_ARROW}
            className="ml-2"
            style={{ height: 20, width: 20 }}
            data-toggle="tooltip"
            title="Next Week!"
            alt="<"
            onClick={() => {
              setdate(moment(date).subtract(1, 'd'));
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
                  className="date-picker"
                  value={date}
                  allowClear={false}
                  defaultValue={date}
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
          </div> */}
          {/* <div className="drp-select-group">
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
          </div> */}
        </div>
      </div>
      <div className="shift-table-container">
        <Table
          className="shiftpool-table py-1 my-4 text-center"
          column={4}
          responsive
          borderless={true}
          //   striped
          //   bordered={true}
        >
          <thead className="shift-table-header">
            <tr className="" style={{ backgroundColor: 'transparent' }}>
              <th>Shift</th>
              <th>Members</th>
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
                <td>
                  {shift?.isAssigned ? (
                    <div className="assinged-image-switch round2 rounded-12 ">
                      <Avatar
                        size={24}
                        shape="circle"
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      />
                      <h6>
                        {getAssignedUser(shift?.users)?.userDetail?.firstName}
                      </h6>
                    </div>
                  ) : (
                    <Avatar.Group
                      maxCount={3}
                      size="large"
                      maxStyle={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                      }}
                    >
                      {shift?.users.map((user) => {
                        return (
                          <Avatar
                            size={24}
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          />
                        );
                      })}
                    </Avatar.Group>
                  )}
                </td>
                <td className="py-2">
                  {shift?.department?.location?.restaurant?.restaurantName}
                </td>
                <td className="py-2">
                  {shift?.department?.location?.locationName}
                </td>
                <td className="py-2">{shift?.department?.departmentName}</td>
                <td className="py-2 d-flex justify-content-center">
                  {shift?.isAssigned ? (
                    <>
                      <Custombutton
                        title="Assigned"
                        type="sucess"
                        shape="round"
                      />
                      <div
                        onClick={() => {
                          setSelectedShift(index);
                          setVisible(true);
                        }}
                        className="edit-bid"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <Custombutton
                        title="Assign To "
                        type="primary"
                        shape="round"
                        onClick={() => {
                          setSelectedShift(index);
                          setVisible(true);
                        }}
                      />
                      <div visible={false} className="edit-bid-hidden "></div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {data?.results?.length === 0 && (
        <Empty
          className="empty-container"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      <Pagination
        onChange={(page) => setpage(page)}
        total={data?.pageMeta?.totalCount || 0}
        pageSize={size}
        hideOnSinglePage={true}
      />
      <Modal
        // closable={false}

        show={state.payment}
        size="lg"
        onHide={() => {
          setstate((prevState) => {
            return { ...prevState, payment: false };
          });
        }}
        onCancel={() => {
          setstate((prevState) => {
            return { ...prevState, payment: false };
          });
        }}
        // width={500}
        // footer={null}
        className="payment-review-modal"
      >
        {state?.isPaid ? (
          <>
            <div className="work-details d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex">
                <h3 className="text-black payment-summary">Payment Summary</h3>
                <CloseOutlined
                  onClick={() => {
                    setstate((prevState) => {
                      return { ...prevState, payment: false };
                    });
                  }}
                  style={{ color: '#08c', fontSize: 18 }}
                  // className="text-white"
                  className="close-modal"
                />
              </div>

              <img height="50px" className="mt-3" src={GreenCheck} />
              <div className="paid-status text-white mt-4">PAID</div>

              <div className=" d-flex mt-4 justify-content-end">
                <img
                  height="30px"
                  //   src={Dollor}
                  // width="35px"
                  src="https://w7.pngwing.com/pngs/1009/480/png-transparent-computer-icons-others-trademark-payment-logo.png"
                />
                <div className="total-amt-value text-white ">20.00</div>
              </div>
              <div className="text-white mt-3">TO</div>
              <div className="d-flex align-items-center justify-content-center">
                <Avatar
                  style={{ width: '55px', height: '55px' }}
                  src="https://i.pinimg.com/474x/7b/81/77/7b817759c1c798e6747c7a650e0c30d7.jpg"
                />
                <h3 className="user-name text-white ">Andrew startk</h3>
              </div>
              <div className="d-flex align-items-center mt-3 ">
                <table className="summary-table">
                  <tr>
                    <td className="mr-6 label-hr pricing-info text-white">
                      {' '}
                      Payment Method
                    </td>
                    <td className="pricing-info px-3 value-hr text-white">
                      : <span className="mr-2"></span>Paypal Payment Address
                    </td>
                  </tr>
                  <tr>
                    <td className="mr-6 label-hr pricing-info text-white">
                      {' '}
                      Payment Address
                    </td>
                    <td className="pricing-info  px-3  value-hr text-white">
                      : <span className="mr-2 text-white"> </span>asdf@gmail.con
                    </td>
                  </tr>
                </table>
              </div>
              <a className="view-statemet text-white" href="url">
                View Receipt
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="work-details d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex">
                <h3 className="text-black work-summary">Work Summary</h3>
                <CloseOutlined
                  onClick={() => {
                    setstate((prevState) => {
                      return { ...prevState, payment: false };
                    });
                  }}
                  style={{ color: '#08c', fontSize: 18 }}
                  // className="text-white"
                  className="close-modal"
                />
              </div>
              <h2 className="deparment">Customer Support</h2>
              <h2 className="role-location">role | location</h2>

              <div className="mb-3 timings-from-to">
                <h3>04-04-21</h3>
                <h3>04-04-21</h3>
              </div>
            </div>
            <div className="d-flex w-100 flex-column justify-content-center align-items-center">
              <h3 className="proceed-to-pay">Proceed To Payment</h3>
              <div className="d-flex align-items-center justify-content-center">
                <Avatar
                  style={{ width: '55px', height: '55px' }}
                  src="https://i.pinimg.com/474x/7b/81/77/7b817759c1c798e6747c7a650e0c30d7.jpg"
                />
                <h3 className="user-name">Andrew startk</h3>
              </div>
              <h3 className="pricing-info">
                <span className="label-hr">No. of Hours : </span>
                <span className="value-hr">2 | </span>
                <span className="label-hr">Hourly Pay : </span>
                <span className="value-hr"> $10 </span>
              </h3>
              <div className="total-amt d-flex flex-column">
                {/* <div className="d-flex"> */}
                <div className="d-flex align-items-end">
                  <div className="mr-3">
                    <img
                      height="30px mr-2"
                      // width="35px"
                      src={Dollor}
                    />
                  </div>
                  {/* </div> */}
                  <div className=" d-flex flex-column justify-content-end">
                    <div className="total-amt-label">Total Amount</div>
                    <div className="total-amt-value">20.00</div>
                  </div>
                </div>
                <a className="view-statemet" href="url">
                  VIEW STATEMENT
                </a>
                {/* <h4>VIEW STATEMENT</h4> */}
              </div>
              <div className="d-flex align-items-center mt-4 mb-5">
                <table className="summary-table">
                  <tr>
                    <td className="mr-6 label-hr pricing-info"> Pay To </td>
                    <td className="pricing-info px-3 value-hr">
                      : <span className="mr-2"> </span> Andrew Stark P
                    </td>
                  </tr>
                  <tr>
                    <td className="mr-6 label-hr pricing-info">
                      {' '}
                      Payment Method
                    </td>
                    <td className="pricing-info px-3 value-hr">
                      : <span className="mr-2"></span>Paypal Payment Address
                    </td>
                  </tr>
                  <tr>
                    <td className="mr-6 label-hr pricing-info">
                      {' '}
                      Payment Address
                    </td>
                    <td className="pricing-info  px-3  value-hr">
                      : <span className="mr-2"> </span>asdf@gmail.con
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <Button
              style={{ backgroundColor: '#e06030' }}
              block
              type="text"
              size={2}
              onClick={() => {}}
            >
              Send
            </Button>
          </>
        )}
      </Modal>

      <Modal
        title={
          data?.results?.length > 0
            ? `Shift from ${moment(data?.results[selectedShift]?.from).format(
                'hh:mm a',
              )}  - ${moment(data?.results[selectedShift]?.to).format(
                'hh:mm a',
              )}
                `
            : '-'
        }
        show={visible}
        onHide={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        // width={1000}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"

        // footer={[
        //   <Custombutton
        //     title="Close"
        //     type="alternate"
        //     shape="round"
        //     onClick={() => {
        //       setVisible(false);
        //     }}
        //   />,
        // ]}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h7>
              {' '}
              {data?.results?.length > 0
                ? data?.results[selectedShift]?.department?.departmentName
                : ''}{' '}
              |{' '}
              {data?.results?.length > 0
                ? data?.results[selectedShift]?.department?.location
                    ?.locationName
                : []}
            </h7>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AntdTable
            rowClassName={(record, index) =>
              `${record?.isApproved ? 'green-bg' : ''}`
            }
            className={`RCM_two_level_table1 `}
            columns={columns}
            //   expandable={{
            //     expandedRowRender: (record) => (
            //       <p style={{ margin: 0 }}>{record.description}</p>
            //     ),
            //     rowExpandable: (record) => record.name !== 'Not Expandable',
            //   }}
            dataSource={
              data?.results?.length > 0
                ? data?.results[selectedShift]?.users
                : []
            }
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserShifts;
